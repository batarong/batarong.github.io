#!/bin/bash

mkdir /home/user/
mkdir /home/user/Desktop
rm /etc/apt/sources.list
echo "deb http://deb.debian.org/debian/ stable main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian/ stable main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security stable-security main contrib non-free non-free-firmware
deb-src http://security.debian.org/debian-security stable-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ stable-updates main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian/ stable-updates main contrib non-free non-free-firmware" | tee /etc/apt/sources.list
dpkg --add-architecture i386
sudo apt install -y systemd-timesyncd
apt update
apt install -y mesa-vulkan-drivers libglx-mesa0:i386 mesa-vulkan-drivers:i386 libgl1-mesa-dri:i386
apt install -y steam-installer
apt install -y wget
sudo apt purge -y libreof*
sudo apt purge -y goldendict
sudo apt purge -y kmag
sudo apt autoremove -y
sudo rm -rf /home/user/Desktop/steam.desktop
sudo rm -rf /home/user/Desktop/install-debian.desktop
echo "[Desktop Entry]
Version=1.0
Categories=FileTransfer;Game;Network;
Exec=/usr/games/steam %U
Icon=steam
MimeType=x-scheme-handler/steam;x-scheme-handler/steamlink;
Name=Install Steam
Terminal=false
Type=Application
Keywords=games;installer;steam-installer;valve;" | tee /home/user/Desktop/Install-Steam.desktop
echo "[Desktop Entry]
Type=Application
Version=1.0
Name=Install BatarongOS
GenericName=Calamares Installer
Exec=install-debian
Comment=Calamares — Installer for Debian Live
Keywords=calamares;system;install;debian;installer
Icon=install-debian
Terminal=false
Categories=Qt;System;
StartupWMClass=calamares
StartupNotify=True" | tee /home/user/Desktop/Install-BatarongOS.desktop
cd /tmp
sudo wget https://batarong.github.io/wallpaper.zip
sudo rm -rf /usr/share/desktop-base/active-desktop/wallpaper
sudo unzip -d /usr/share/desktop-base/active-desktop wallpaper.zip
