#!/usr/bin/env python3
# -*- coding: utf-8 -*
from subprocess import run
from os import path

srcdir = "testc"
wwwdir = "testwww"
filename = "program.wasm"

run(["make", path.abspath(path.join(wwwdir, filename)), '-C', srcdir])
