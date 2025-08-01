#!/bin/bash

mkdir /home/user/
mkdir /home/user/Desktop
mkdir /usr/share
rm /etc/apt/sources.list
echo "deb http://deb.debian.org/debian/ testing main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian/ testing main contrib non-free non-free-firmware" | tee /etc/apt/sources.list
dpkg --add-architecture i386
apt update
apt install zenity -y
sudo apt install -y systemd-timesyncd
apt install -y mesa-vulkan-drivers libglx-mesa0:i386 mesa-vulkan-drivers:i386 libgl1-mesa-dri:i386
apt install -y steam-installer
apt install -y wget
sudo apt purge -y libreof*
sudo apt purge -y goldendict
sudo apt autoremove -y
sudo rm -f /home/user/Desktop/steam.desktop
sudo rm -f /home/user/Desktop/install-debian.desktop
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
#echo "[Desktop Entry]
#Type=Application
#Version=1.0
#Name=Install BatarongOS
#GenericName=Calamares Installer
#Exec=install-debian
#Comment=Calamares — Installer for Debian Live
#Keywords=calamares;system;install;debian;installer
#Icon=install-debian
#Terminal=false
#Categories=Qt;System;
#StartupWMClass=calamares
#StartupNotify=True" | tee /home/user/Desktop/Install-BatarongOS.desktop
echo "[Desktop Entry]
Version=1.0
Categories=Network;
Exec=wget https://discord.com/download
Icon=discord
MimeType=x-scheme-handler/steam;x-scheme-handler/steamlink;
Name=Install Discord
Terminal=false
Type=Application
Keywords=discord;we;are;not;breaking;the;tos;installer;" | tee /home/user/Desktop/Install-Discord.desktop
cd /tmp


dbus-uuidgen --ensure=/etc/machine-id
dbus-uuidgen --ensure

# wallpaper
sudo wget http://batarong.github.io/batano.png -P /usr/share/wallpapers/
sudo gsettings set org.cinnamon.desktop.background picture-uri  "file:///usr/share/wallpapers/batano.png"

# plymouth
sudo wget -O batarong https://github.com/batarong/batarong-plymouth -P /usr/share/plymouth/themes/
sudo /usr/share/plymouth-set-default-theme -R batarong

# sorry for the mess(welcome screen)

#!/bin/bash

DEFAULT_USER="batarong"  # or whatever your installer creates

mkdir -p /etc/skel/.config/batarongos
cat << 'EOF' > /etc/skel/.config/batarongos/welcome.sh
#!/bin/bash

if [ ! -f "$HOME/.batarongos_first_login_done" ]; then
  zenity --info --title="Welcome to BatarongOS" \
         --text="🦇 Welcome to BatarongOS!!!!! :D \n\nBased Off of Debian.\n\Github: https://github.com/batarong"
  touch "$HOME/.batarongos_first_login_done"
fi
EOF

chmod +x /etc/skel/.config/batarongos/welcome.sh

mkdir -p /etc/skel/.config/systemd/user
cat << EOF > /etc/skel/.config/systemd/user/batarongos-welcome.service
[Unit]
Description=BatarongOS First Login Welcome
After=default.target

[Service]
Type=oneshot
ExecStart=%h/.config/batarongos/welcome.sh

[Install]
WantedBy=default.target
EOF

mkdir -p /etc/skel/.config/systemd/user/default.target.wants
ln -s ../batarongos-welcome.service /etc/skel/.config/systemd/user/default.target.wants/batarongos-welcome.service

if id "$DEFAULT_USER" &>/dev/null; then
  cp -r /etc/skel/.config "/home/$DEFAULT_USER/"
  chown -R "$DEFAULT_USER:$DEFAULT_USER" "/home/$DEFAULT_USER/.config"
fi

# batarong game
#mkdir /batarong-reserved
#cd /batarong-reserved
sudo wget http://batarong.github.io/batarong.png -P /bin
#git clone https://github.com/batarong/batarong-games.git
#HTML_FILE_PATH="/batarong-reserved/batarong-games/batarong-game1.html"
#MENU_NAME="Batarong Game"
#MENU_ICON="/bin/batarong.png"
#DESKTOP_FILE=/usr/share/applications/batarong_game.desktop
#echo "[Desktop Entry]" > $DESKTOP_FILE
#echo "Type=Application" >> $DESKTOP_FILE
#echo "Name=$MENU_NAME" >> $DESKTOP_FILE
#echo "Exec=xdg-open $HTML_FILE_PATH" >> $DESKTOP_FILE
#echo "Icon=$MENU_ICON" >> $DESKTOP_FILE
#echo "Categories=Batarong;" >> $DESKTOP_FILE
#DIRECTORY_FILE=/usr/share/desktop-directories/batarong.directory
#echo "[Desktop Entry]" > $DIRECTORY_FILE
#echo "Type=Directory" >> $DIRECTORY_FILE
#echo "Name=Batarong" >> $DIRECTORY_FILE
#echo "Icon=$MENU_ICON" >> $DIRECTORY_FILE
# branding
#echo "[Branding]
#logo=/bin/batarong.png" | tee /etc/calamares/branding/branding.desc
# bata and create
sudo wget -O bata https://raw.githubusercontent.com/rock3tsprocket/Bata/refs/heads/patch-1/bata -P /usr/bin/bata
sudo chmod +x /usr/bin/bata
sudo wget -O create https://raw.githubusercontent.com/batarong/batautils/refs/heads/main/create/create -P /usr/bin/create
sudo chmod +x /usr/bin/create
# final touch
sudo rm /etc/os-release
echo 'NAME="BatarongOS"
ID=batarongos
ID_LIKE=debian
PRETTY_NAME="BatarongOS -15.7
VERSION="-15.7"
VERSION_ID=-15.7
HOME_URL="https://batarong.neocities.org"
BUG_REPORT_URL="https://github.com/batarong/Batarong-Installer/issues"
LOGO=batarongos-logo
VENDOR_NAME="Batarong Organization"' | tee /etc/os-release
curl https://batarong.github.io/other-install.sh | bash
