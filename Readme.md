# WebAssembly + WebGL = Native OpenGL ES 3.0 called by C/C++ on Web


## Directory Structure

* `testc` : The testing C program which invokes OpenGL ES 3.0 APIs to render something.
* `testwww` : A simple webroot for testing.
* `testhost.py` : A script that runs a HTTP server on port 8000, using `testwww` as webroot.
* `compile.py` and `recompile.py` : These scripts invokes `makefile` to run compilation and copy the generated `program.wasm` into webroot directory.

## Requirements

* `python3` : To run the scripts.
* `clang` and `wasm-ld` : The compiler and the linker to generate.
* `makefile` : Normal GNU `make`. Should work with `clang` (that means it should know `.c` => `.o`).
* Non-IE browser : Should be able to run WebAssembly programs.
