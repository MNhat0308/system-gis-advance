<?php

namespace App\Console\Commands;

use App\Models\Route;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SmartCrawlBusPaths extends Command
{
    protected $signature = 'crawl:smart-bus-paths';
    protected $description = 'Crawl bus paths and store geometry by matching RouteNo to routes.code';

    public function handle()
    {
        $this->info('📥 Fetching all routes from API...');

        $response = Http::get('http://apicms.ebms.vn/businfo/getallroute');

        if (!$response->successful()) {
            $this->error('❌ Failed to fetch routes from API.');
            return;
        }

        $apiRoutes = $response->json();
        $this->info('✅ Got ' . count($apiRoutes) . ' API routes.');

        foreach ($apiRoutes as $apiRoute) {
            $routeNo = $apiRoute['RouteNo'];
            $routeId = $apiRoute['RouteId'];

            $localRoute = Route::where('code', $routeNo)->first();

            if (!$localRoute) {
                continue;
            }

            $successCount = 0;

            for ($variantId = 1; $variantId <= 10; $variantId++) {
                if ($successCount >= 2) {
                    break;
                }

                $url = "http://apicms.ebms.vn/businfo/getpathsbyvar/{$routeId}/{$variantId}";
                $this->info("🌐 Fetching: $url");

                try {
                    $res = Http::timeout(5)->get($url);

                    if ($res->successful()) {
                        $raw = $res->json();

                        if (!empty($raw['lat']) && !empty($raw['lng']) && count($raw['lat']) === count($raw['lng'])) {
                            $coordinates = [];

                            foreach ($raw['lat'] as $i => $lat) {
                                $lng = $raw['lng'][$i];
                                $coordinates[] = "$lng $lat";
                            }

                            $wkt = 'LINESTRING(' . implode(', ', $coordinates) . ')';
                            $isBound = $successCount === 0;

                            // Update correct route_variant
                            $updated = DB::table('route_variants')
                                ->where('route_id', $localRoute->id)
                                ->where('is_outbound', $isBound)
                                ->update([
                                    'path_line' => DB::raw("ST_GeomFromText('$wkt', 4326)"),
                                ]);

                            if ($updated) {
                                $successCount++;
                            } else {
                                $this->warn("⚠️ Could not find route_variant with is_bound = " . ($isBound ? 'true' : 'false'));
                            }
                        } else {
                            $this->warn("⚠️ Invalid lat/lng data for variant $variantId");
                        }
                    } else {
                        $this->warn("❌ API failed for variant $variantId");
                    }
                } catch (\Exception $e) {
                    $this->error("❌ Error fetching variant $variantId: " . $e->getMessage());
                }
            }

            if ($successCount === 0) {
                $this->warn("❌ No geometry stored for route code: $routeNo");
            }
        }

        $this->info("✅ All done.");
    }
}
