#!/usr/bin/env python3
# -*- coding: utf-8 -*
import subprocess
import os
import shutil

srcdir = "testc"
wwwdir = "testwww"
filename = "program.wasm"
srcpath = "%s/%s" % (srcdir, filename)
wwwpath = "%s/%s" % (wwwdir, filename)
subprocess.run(["make", "-C", srcpath])

if os.path.exists(srcpath):
	if os.path.exists(wwwpath): os.remove(wwwpath)

if not os.path.exists(wwwpath):
	shutil.copyfile(srcpath, wwwpath)

