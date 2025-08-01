#!/bin/bash

if [ ! -f "$HOME/.first_login_done" ]; then
  clear
  echo "======================================="
  echo "        Welcome to BatarongOS!!!       "
  echo "======================================="
  echo "Feel free to check out the Batarong Game XD"
  echo "Github: https://github.com/batarong"
  echo "- Based on Debian"
  echo "- Modified by Mam man dev and many others"
  echo "Idk what else to say"
  echo "So."
  echo "Enjoy Batarong!"
  touch "$HOME/.first_login_done"
fi
