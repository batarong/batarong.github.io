import os
import time
import socket

def check_internet(): # isnt it simple
    try:
        socket.create_connection(("www.google.com", 80), timeout=5)
    except OSError:
        print("No internet please connect you kinda need it to install an os :)")
        time.sleep(2)
        os.system("clear")
        print("Choose a way to fix this problem")
        print("1: Connect to wifi (nmtui)")
        print("2: Drop to shell")
        print("3: Continue")
        print("Error function not implemented please contact developer")
        exit()

check_internet()

# Read the content of the /etc/os-release file
with open('/etc/os-release', 'r') as file:
    for line in file:
        if line.startswith('NAME='):
            NAME = line.split('=')[1].strip().strip('"')
            break
          
if NAME == "Debian GNU/Linux" or NAME == "Ubuntu" or NAME == "LMDE" or NAME == "Batarong GNU/Linux":
    # dependencies
    os.system("sudo apt install -y git sudo fdisk dosfstools util-linux bash fdisk rsync wget")
else:
    print("You are not on Debian. This may not work. Check https://github.com/batarong/Batarong-Builder/wiki/Errors for more information.")
    print("Continuing... Press Ctrl C now if your going to")
    time.sleep(3)
    print("Going!!!")

#expecting i implemented this
# Open Batarong
os.chdir("/root/Batarong-Installer")
# Future proof
os.system("sudo chmod 777 install.sh")
# USER SEE
os.system("sudo fdisk -l")
# Get the device path from user input
device_path = input("Enter your device path: ")
# Run the install.sh script with the device path using os.system()
os.system(f"sudo bash install.sh -d {device_path}")
