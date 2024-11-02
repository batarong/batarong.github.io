#!/bin/bash

rm /etc/apt/sources.list
echo "deb http://deb.debian.org/debian/ stable main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian/ stable main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security stable-security main contrib non-free non-free-firmware
deb-src http://security.debian.org/debian-security stable-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ stable-updates main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian/ stable-updates main contrib non-free non-free-firmware" | tee /etc/apt/sources.list
dpkg --add-architecture i386
apt update
apt install -y mesa-vulkan-drivers libglx-mesa0:i386 mesa-vulkan-drivers:i386 libgl1-mesa-dri:i386
apt install -y steam-installer
