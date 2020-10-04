// prettier-ignore
export default function quantize(n) {
	if (n >    0 && n <    1) { return    0 }
	if (n >    1 && n <    2) { return    1 }
	if (n >    2 && n <    3) { return    2 }
	if (n >    3 && n <    4) { return    3 }
	if (n >    4 && n <    6) { return    4 }
	if (n >    6 && n <    8) { return    6 }
	if (n >    8 && n <   12) { return    8 }
	if (n >   12 && n <   16) { return   12 }
	if (n >   16 && n <   24) { return   16 }
	if (n >   24 && n <   32) { return   24 }
	if (n >   32 && n <   48) { return   32 }
	if (n >   48 && n <   64) { return   48 }
	if (n >   64 && n <   96) { return   64 }
	if (n >   96 && n <  128) { return   96 }
	if (n >  128 && n <  192) { return  128 }
	if (n >  192 && n <  256) { return  192 }
	if (n >  256 && n <  384) { return  256 }
	if (n >  384 && n <  512) { return  384 }
	if (n >  512 && n <  768) { return  512 }
	if (n >  768 && n < 1024) { return  768 }
	if (n > 1024 && n < 1536) { return 1024 }
	if (n > 1536 && n < 2048) { return 1536 }
	return n
}
