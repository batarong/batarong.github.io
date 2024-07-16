#!/bin/bash


round_down_to_list() {
    number=$1
    shift
    num_list=("$@")

    max=0
    for num in "${num_list[@]}"; do
        if [ $(bc -l <<< "scale=0; $num <= $number") -eq 1 ] && [ $(bc -l <<< "scale=0; $num > $max") -eq 1 ]; then
            max=$num
        fi
    done

    echo $max
}

while getopts ":b:d:h" opt; do
  case ${opt} in
    d )
      device=$OPTARG
      echo "Block device specified: $device"
      # Add your logic for handling the block device here
      if [ ! -d "/tmp/Batarong-Builder/rootfs" ]; then
        echo "WARN: if you are not root ctrl-c and run with sudo"
        echo "WARN: Please check that you have unmounted the disk if so ignore"
        sleep 5
        devicei=$OPTARG
        devicei+="*"
        sudo umount -f $devicei 2>/dev/null
        sudo dd if=$device of=/dev/urandom count=2000
        echo "type=83" | sudo sfdisk $device
        num_list=(15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115 120 125 130)
        deviced="${device: -3}"
        result=$(round_down_to_list $(printf "%.0f" $(lsblk -b -o NAME,SIZE /dev/$deviced | awk -v dev="$deviced" '$1==dev {print $2/1024/1024/1024}') "${num_list[@]}")))
        if [ $result -eq 0 ]; then
          echo "your disk is small"
          exit 0
        fi
        layouts="layout"
        layouts+=$result
        sudo sfdisk $device < layout/$layouts
        mkdir /tmp/tmp
        mkdir /tmp/tmp/mnt
        device1=$OPTARG
        device2=$OPTARG
        device1+="1"
        device2+="2"
        echo "WARN: acsept any prompts"
        sudo mkfs.ext4 -F $device1
        sudo mkfs -t fat $device2
        e2label $device1 "BIG-BATARONG"
        dosfslabel $device2 "BATA-EFI"
        sudo mount $device1 /tmp/tmp/mnt
        sudo rsync -aAXHv / --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} /mnt
        sudo mount --rbind /sys /tmp/tmp/mnt/sys/
        sudo mount --rbind /dev /tmp/tmp/mnt/dev/
        sudo mkdir /tmp/tmp/mnt/boot/EFI
        sudo mount $device2 /tmp/tmp/mnt/boot/EFI
        sudo mkdir /tmp/tmp/mnt/boot/EFI/EFI
        sudo mkdir -p /tmp/tmp/mnt/var/cache/apt/archives/partial
        cd /tmp/tmp/mnt/boot/EFI/EFI
        git clone https://github.com/batarong/refind.git
        mv refind boot
        cd /tmp/tmp/mnt/boot/
        wget https://batarong.github.io/dev/refind_linuxi.conf -O refind_linux.conf
        cd /root/Batarong-Installer/
        bash /root/Batarong-Installer/config.sh
        echo "root:batarong" | chpasswd -R /tmp/tmp/mnt
        useradd -m -R /tmp/tmp/mnt -p $(openssl passwd -1 batarong) batarong
        sudo chroot /tmp/tmp/mnt usermod --shell /bin/bash batarong
        sudo chroot /tmp/tmp/mnt usermod --shell /bin/bash root
        sudo chroot /tmp/tmp/mnt usermod -a -G sudo batarong 
        echo "Done: Unmounting"
        sudo umount $devicei 2>/dev/null
      else
        devicei=$OPTARG
        devicei+="*"
        sudo umount -f $devicei 2>/dev/null
        sudo dd if=$device of=/dev/urandom count=2000
        echo "type=83" | sudo sfdisk $device
        sudo sfdisk $device < layout
        mkdir /tmp/tmp
        mkdir /tmp/tmp/mnt
        device1=$OPTARG
        device2=$OPTARG
        device1+="1"
        device2+="2"
        echo "WARN: acsept any prompts"
        sudo mkfs.ext4 $device1
        sudo mkfs -t fat $device2
        e2label $device1 "INSTALL-ROOT"
        dosfslabel $device2 "INSTALL-EFI"
        sudo mount $device1 /tmp/tmp/mnt
        sudo cp -r rootfs/* /tmp/tmp/mnt
        sudo mount --rbind /sys /tmp/tmp/mnt/sys/
        sudo mount --rbind /dev /tmp/tmp/mnt/dev/
        sudo mkdir /tmp/tmp/mnt/boot/EFI
        sudo mount $device2 /tmp/tmp/mnt/boot/EFI
        sudo mkdir /tmp/tmp/mnt/boot/EFI/EFI
        cd /tmp/tmp/mnt/boot/EFI/EFI
        git clone https://github.com/batarong/refind.git
        cd /tmp/tmp/mnt/boot
        wget https://batarong.github.io/dev/refind_linux.conf
        cd /tmp/Bat*
        bash config.sh
        echo "root:batarong" | chpasswd -R /tmp/tmp/mnt
        echo "Done: Unmounting"
        sudo umount $devicei 2>/dev/null
      fi
      ;;
    h )
      echo "Usage: ./install.sh [OPTIONS]"
      echo "Options:"
      echo "  -d    Specify block device"
      echo "  -h    Display this help message"
      echo "  -a    WHY ARE YOU HERER THIS IS DEV THINGS????"
      ;;
    \? )
      echo "Invalid option: $OPTARG"
      ;;
  esac
done
