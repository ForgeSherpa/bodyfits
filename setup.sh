echo "Refreshing Database..."
php artisan migrate:fresh --seed
echo "Migrating photo..."
php artisan migrate:photo
echo "Done."