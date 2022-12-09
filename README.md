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

Finally, if you get vite manifest error, make sure to run `yarn dev` or `sail yarn dev`.

# Credits

-   [Albet](https://github.com/albetnov) (Developer)
-   [Wira](https://www.instagram.com/wirango/) (Developer)
-   [Vincent](https://www.instagram.com/vincen_vincentt/) (UI/UX + Tester)
-   [Delvin](https://instagram.com/d.jason_28?igshid=YmMyMTA2M2Y=) (Calon Kentang + Calon Ketua HMPS + Developer)
-   [Atnan](https://instagram.com/4tnan?igshid=MWM2YjBjM2Q=) (UI/UX)
-   [Jeffry](https://instagram.com/jefrryarisprtma?igshid=ZDdkNTZiNTM=) (UI/UX)
