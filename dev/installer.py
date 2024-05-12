import os
import time

# Read the content of the /etc/os-release file
with open('/etc/os-release', 'r') as file:
    for line in file:
        if line.startswith('NAME='):
            NAME = line.split('=')[1].strip().strip('"')
            break
          
if NAME == "Debian GNU/Linux" or NAME == "Ubuntu":
    # dependencies
    os.system("sudo apt install -y git sudo fdisk debootstrap dosfstools util-linux")
else:
    print("You are not on Debian. This may not work. Check https://github.com/batarong/Batarong-Builder/wiki/Errors for more information.")
    print("Continuing... Press Ctrl C now if your going to")
    time.sleep(3)
    print("Going!!!")

# Change directory
os.chdir("/tmp")
# Clone the installer
os.system("sudo git clone https://github.com/batarong/Batarong-Builder.git")
# Open Batarong
os.chdir("/tmp/Batarong-Builder")
# Future proof
os.system("sudo chmod 777 install.sh")
# Get the device path from user input
device_path = input("Enter your device path: ")
# Run the install.sh script with the device path using os.system()
os.system(f"bash install.sh -d {device_path}")
