[![Travis](https://travis-ci.org/binji/binjgb.svg?branch=master)](https://travis-ci.org/binji/binjgb) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/binji/binjgb?branch=master&svg=true)](https://ci.appveyor.com/project/binji/binjgb/branch/master)

# binjgb

A simple GB/GBC emulator.

## Play in Samsung TV!! :-)

Follow to ![Link](/SamGameBoy/)

## Features

* [Runs in the browser using WebAssembly](https://binji.github.io/binjgb)
* Hacky-but-passable **CGB support**!
* Cycle accurate, passes many timing tests (see below)
* Supports MBC1, MBC1M, MMM01, MBC2, MBC3, MBC5 and HuC1
* Save/load battery backup
* Save/load emulator state to file
* **Fast-forward**, pause and step one frame
* **Rewind** and seek to specific cycle
* Disable/enable each audio channel
* Disable/enable BG, Window and Sprite layers
* Convenient Python test harness using hashes to validate
* (WIP) **Debugger** with various visualizations (see below)

## DMG Screenshots

![Bionic Commando](/images/bionic.png)
![Donkey Kong](/images/dk.png)
![Kirby's Dreamland 2](/images/kirby2.png)
![Mole Mania](/images/mole.png)
![Mario's Picross](/images/picross.png)
![Trip World](/images/trip.png)
![Wario Land](/images/wario.png)
![Game Boy Wars](/images/wars.png)
![Is That a Demo in Your Pocket?](/images/pocket.png)

## CGB Screenshots

![Dragon Warrior](/images/dw.png)
![Hamtaro](/images/ham.png)
![Metal Gear Solid](/images/mgs.png)
![It Came From Planet Zilog](/images/pz.png)
![Survival Kids](/images/sk.png)
![Aevilia](/images/aevilia.png)
![Toki Tori](/images/toki.png)
![Wario 3](/images/wario3.png)

## Debugger Screenshots

![Debugger](/images/debugger.png)
![OBJ](/images/obj-window.png)
![Map](/images/map-window.png)
![Tile Data](/images/tiledata-window.png)
![Breakpoints](/images/breakpoint.png)

## Cloning

Use a recursive clone, to include the submodules:

```
$ git clone --recursive https://github.com/binji/binjgb
```

If you've already cloned without initializing submodules, you can run this:

```
$ git submodule update --init
```

## Building

Requires [CMake](https://cmake.org) and
[SDL2](http://libsdl.org/download-2.0.php). Debugger uses
[dear imgui,](https://github.com/ocornut/imgui) (included as a git submodule).

### Building (Linux/Mac)

If you run `make`, it will run CMake for you and put the output in the `bin/`
directory.

```
$ make
$ bin/binjgb foo.gb
```

You can also just use cmake directly:

```
$ mkdir build
$ cd build
$ cmake ..
$ make
```

### Building (Windows)

When building on Windows, you'll probably have to set the SDL2 directory:

```
> mkdir build
> cd build
> cmake .. -G "Visual Studio 15 2017" -DSDL2_ROOT_DIR="C:\path\to\SDL\"
```

Then load this solution into Visual Studio and build it. Make sure to build the
`INSTALL` target, so the exectuables are built to the `bin` directory.

### Building WebAssembly

You can build binjgb as a WebAssembly module. You'll need an incoming build of
emscripten. See https://github.com/kripken/emscripten/wiki/WebAssembly and
http://kripken.github.io/emscripten-site/docs/building_from_source/index.html#installing-from-source.

Put a symlink to Emscripten in the `emscripten` directory, then run make.

```
$ ln -s ${PATH_TO_EMSCRIPTEN} emscripten
$ make wasm
```

### Changing the Build Configuration

If you change the build config (e.g. update the submodules), you may need to run CMake again.
The simplest way to do this is to remove the `out/` directory.

```
$ rm -rf out/
$ make
```

## Running

```
$ bin/binjgb <filename>
$ bin/binjgb-debugger <filename>
```

Keys:

| Action | Key |
| --- | --- |
| DPAD-UP | <kbd>↑</kbd> |
| DPAD-DOWN | <kbd>↓</kbd> |
| DPAD-LEFT | <kbd>←</kbd> |
| DPAD-RIGHT | <kbd>→</kbd> |
| B | <kbd>Z</kbd> |
| A | <kbd>X</kbd> |
| START | <kbd>Enter</kbd> |
| SELECT | <kbd>Tab</kbd> |
| Quit | <kbd>Esc</kbd> |
| Save state | <kbd>F6</kbd> |
| Load state | <kbd>F9</kbd> |
| Toggle fullscreen | <kbd>F11</kbd> |
| Disable audio channel 1-4 | <kbd>1</kbd>-<kbd>4</kbd> |
| Disable BG layer | <kbd>B</kbd> |
| Disable Window layer | <kbd>W</kbd> |
| Disable OBJ (sprites) | <kbd>O</kbd> |
| Fast-forward | <kbd>Lshift</kbd> |
| Rewind | <kbd>Backspace</kbd> |
| Pause | <kbd>Space</kbd> |
| Step one frame | <kbd>N</kbd> |

## Running tests

Run `scripts/build_tests.py` to download and build the necessary testsuites.
This works on Linux and Mac, not sure about Windows.

`scripts/tester.py` will only run the tests that match a filter passed on the
command line. Some examples:

```
# Run all tests
$ scripts/tester.py

# Run all tests mooneye tests
$ scripts/tester.py mooneye

# Run all gpu tests
$ scripts/tester.py gpu
```

## Test status

[See test results](test_results.md)
