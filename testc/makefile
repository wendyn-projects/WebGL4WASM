CC=clang
LD=wasm-ld
CFLAGS=-O3 --target=wasm32 -flto --no-standard-libraries -Iinclude
LDFLAGS=--no-entry --export-all --allow-undefined

SOURCES=$(wildcard *.c)
OBJS=$(SOURCES:.c=.o)

all: program.wasm

%.wasm: $(OBJS)
	$(LD) $(LDFLAGS) $^ -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $^

.PHONY: clean
clean:
	rm -f $(OBJS)