#!/bin/python3
import os
from /etc/os-release import NAME

if NAME="Debian GNU/Linux":
  # dependencys
  os.system("sudo apt install -y git sudo fdisk debootstrap dosfstools util-linux")
else:
  print("your not on debian this may not work https://github.com/batarong/Batarong-Installer/wiki/Errors")


# change directory
os.chdir("/tmp")
# grab the installer
os.system("sudo git clone https://github.com/batarong/Batarong-Installer.git")
# Open batarong
os.chdir("/tmp/Batarong-Installer")
# future proofing
os.system("sudo chmod 777 install.sh")
# Get the device path from user input
device_path = input("Enter your device path: ")
# Run the install.sh script with the device path using os.system()
os.system(f"bash install.sh -d {device_path}")
