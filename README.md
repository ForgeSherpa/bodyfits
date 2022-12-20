# BodyFits

Is a project that created by a bunch of kids for finishing their assignment xD.

# Installation (Docker)

BodyFits make it painless to install this app. All you need simply:

-   Docker
-   PHP
-   Composer

And nothing else. Just that.

Installation

-   Fire up your docker
-   Clone this repository
-   composer install
-   execute `./vendor/bin/sail build && ./vendor/bin/sail up`.
-   Your app should up and running. Don't forget to execute `./vendor/bin/sail yarn dev` to start vite server.

# Installation (WSL / Ubuntu)

> This script only work for Ubuntu and it's derivatives with minimum 22.04. Older version of Ubuntu need to add [ondrej-ppa](https://launchpad.net/~ondrej/+archive/ubuntu/php) first.

BodyFits also provide install on Ubuntu WSL if you want to. Simply execute `./bin/autosetup.sh`. And your setup is done.

> In case executing `autosetup.sh` not working, it may be caused by permission. You can fix it by: `chmod u+x ./bin/autosetup.sh` (use sudo if needed).

> You may also need to setup your MySQL manually. As from what I remember, newer version of MySQL disallow root login.

> Other distribution require manual install and need adjustment in package manager. Or use docker for multiplatform.

# Manual Installation

Requirements:

-   PHP
-   Composer
-   MySQL
-   Yarn

If you have them all, then simply follow steps below:

-   Clone this repository
-   composer install
-   That's it.

> I know manual one looks much simpler and fewer steps. But using dockerized one is better since it's container based. So you won't get installation problem, etc.

# Setting Up

Yes your project is running, but it shows error. That's a expected behaviour.

To fix it simply run.

`php artisan setup --init`.

If you're using sail (docker) then:

`sail php artisan setup --init`

Command above will run installation it's needs to make sure your app up and running.

Finally, if you get vite manifest error, make sure to run `yarn dev`.

Sail should do this automatically for you, In case it's not. You can run `sail yarn dev`.

## Production Build

To get the best out of BodyFits. Don't forget to setup your `APP_ENV` to `production` and `APP_DEBUG` to `false`.

You might also want to bundle the assets by running `yarn build` though.

# Credits

-   [Albet](https://github.com/albetnov) (Developer)
-   [Wira](https://www.instagram.com/wirango/) (Developer)
-   [Vincent](https://www.instagram.com/vincen_vincentt/) (UI/UX + Tester)
-   [Delvin](https://instagram.com/d.jason_28?igshid=YmMyMTA2M2Y=) (Calon Kentang + Calon Ketua HMPS + Developer)
-   [Atnan](https://instagram.com/4tnan?igshid=MWM2YjBjM2Q=) (UI/UX)
-   [Jeffry](https://instagram.com/jefrryarisprtma?igshid=ZDdkNTZiNTM=) (UI/UX)
