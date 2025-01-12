sudo rm -f /etc/calamares/branding/debian/branding.desc
echo '---
componentName:   debian
welcomeStyleCalamares: true
welcomeExpandingLogo: true
windowExpanding: normal
windowSize: 800px,520px
windowPlacement: center

strings:
    productName:         BatarongOS
    shortProductName:    BatarongOS
    version:             -15.7
    shortVersion:        -15.7
    versionedName:       BatarongOS -15.7
    shortVersionedName:  BatarongOS -15.7
    bootloaderEntryName: BatarongOS
    productUrl:          https://batarong.neocities.org
    supportUrl:          https://www.github.com/batarong/Batarong-Installer/issues
    knownIssuesUrl:      https://www.github.com/batarong/Batarong-Installer/issues
    releaseNotesUrl:     https://www.debian.org/releases/bookworm/releasenotes
    donateUrl:           https://www.patreon.com/NileDev

images:
    productLogo:         "/bin/batarong.png"
    productIcon:         "/bin/batarong.png"
    productWelcome:      "welcome.png"
    # productWallpaper:  "wallpaper.png"

slideshow:               "show.qml"

style:
   sidebarBackground:    "#2c3133"
   sidebarText:          "#FFFFFF"
   sidebarTextSelect:    "#4d7079"
   sidebarTextSelect:    "#292F34"

slideshowAPI: 2' | tee /etc/calamares/branding/debian/branding.desc
