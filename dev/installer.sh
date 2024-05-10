#!/bin/bash
cd /tmp
apt install git
git clone https://github.com/batarong/Batarong-Installer.git
cd Batarong-Installer
echo "Enter your device path:"
read cool
bash install.sh -d $cool
