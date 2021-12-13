#include<stdint.h>

void consoleLog(char *str);

char * c_hello()
{
	consoleLog("Hello world!\n");
	return "Hello world!";
}
