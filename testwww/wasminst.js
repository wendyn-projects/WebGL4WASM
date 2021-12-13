class wasmInst
{
    txtDec;
    wasmUrl;
    memory;
    exports;
    imports;
    wasmInst;
    loaded;
    onLoaded;

    constructor(loadFrom = "", mem_min = 1)
    {
        this.txtDec = new TextDecoder();
        this.wasmUrl = loadFrom;
        this.memory = new WebAssembly.Memory({initial: mem_min});
        this.exports = {};
        this.imports =
        {
            __linear_memory: this.memory,
            consoleLog: offset => console.log(this.getString(offset))
        };
        this.wasmInst = null;
        this.loaded = false;
        this.onLoaded = function(program){};
    }

	getString(offset)
	{
		var ptr = offset;
		var membytes = new Uint8Array(this.memory.buffer);
		while(membytes[ptr]) ptr++;
		return this.txtDec.decode(membytes.subarray(offset, ptr));
	}

    loadWasm(loadFrom = "")
    {
        var wasmUrl = loadFrom;
        if (this.wasmUrl) wasmUrl = this.wasmUrl;
        else this.wasmUrl = wasmUrl;
        return WebAssembly.instantiateStreaming(fetch(wasmUrl), {env: this.imports})
        .then(result => {
            this.wasmInst = result.instance;
            this.exports = this.wasmInst.exports;
            this.memory = this.exports["memory"];
            this.loaded = true;
            this.onLoaded(this);
        });
    }

    importFunction(symbol, callable)
    {
        Console.assert(this.loaded == false);
        this.imports[symbol] = callable;
    }

	memoryHexView()
	{
        var membytes = new Uint8Array(this.memory.buffer);
		var rowPtr = 0;
		var rowAllZeroPrompted = false;
		var ret = "<b>Memory dump: size of 0x" + membytes.length.toString(16) + " bytes in total.</b><br><table><thead><tr align='left'><th>Offset</th><th>00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</th><th>ASCII</th></tr></thead><tbody>";
		for(;rowPtr < membytes.length; rowPtr += 16)
		{
			var rowArr = membytes.subarray(rowPtr, rowPtr + 16);
			var rowIsAllZero = true;
			var rowHex = ""
			var rowChr = ""
			for(var i = 0; i < rowArr.length; i++)
			{
				var bv = rowArr[i];
				if (bv != 0) rowIsAllZero = false;
				rowHex += ("0" + bv.toString(16)).slice(-2).toUpperCase() + " ";
				if (bv >= 20 && bv <= 127) rowChr += String.fromCharCode(bv);
				else rowChr += '.';
			}
			if (rowIsAllZero)
			{
				if (!rowAllZeroPrompted)
				{
					ret += "<tr><td>" + ("00000000" + rowPtr.toString(16)).slice(-8).toUpperCase() + ":</td><td>...</td><td>...</td></tr>";
					rowAllZeroPrompted = true;
				}
			}
			else
			{
				rowAllZeroPrompted = false;
				ret += "<tr><td>" + ("00000000" + rowPtr.toString(16)).slice(-8).toUpperCase() + ":</td><td>" + rowHex + "</td><td>" + rowChr + "</td></tr>";
			}
		}
		ret += "</tbody></table>";
		return ret;
	}
};
