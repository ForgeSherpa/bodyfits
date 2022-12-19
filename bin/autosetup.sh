#!/bin/bash
echo "Automating bodyfits setup, Please wait..."
echo "Please input your account password if prompted"
echo "Script made by Albet Novendo"
sudo apt update
sudo apt install -y php php-common php-mysql php-gd php-mbstring php-xml php-xdebug php-intl php-zip php-curl
sudo apt install -y composer
sudo apt install -y mysql-server
echo "Common installation complete. Proceeding to installing NodeJS"
sudo apt install -y wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
nvm install --lts
nvm use --lts
echo "Proceeding to install git, and bodyfits in current directory"
sudo apt install -y git
git clone https://github.com/albetnov/bodyfits-inertia.git
echo "Please note that you need to setup git manually, as I am to lazy to do that for you"
echo "Now I will setup this WSL to run Code Server."
echo "I will not get in touch with your windows to use this wsl code server. So do it by your own!"
echo "https://code.visualstudio.com/docs/remote/wsl. any question DM me in WA directly"
cd bodyfits-inertia
composer install
corepack enable
yarn set version classic
yarn
echo "Installation Complete."