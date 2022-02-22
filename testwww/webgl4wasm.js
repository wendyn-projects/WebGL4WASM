
// OpenGL ES 3.0 Spec:
// https://www.khronos.org/registry/OpenGL-Refpages/es3.0/

// WebGL 1.0 Spec:
// https://www.khronos.org/registry/webgl/specs/latest/1.0/

// WebGL 2.0 Spec:
// https://www.khronos.org/registry/webgl/specs/latest/2.0/

// Author: 0xAA55
// https://github.com/0xAA55/

class WebGL4WASM
{
	wasmContainer;
	GLContext;
	webGLObjectIndex;
	webGLObjectConversion; // index: WebGLObject
	webGLBufferBinding; // target: WebGLObject
	webGLUniformLocationForPrograms; // WebGLProgram: {locationIndex: int, locations : {locationName: {index: index, location] = WebGLUniformLocation}}}}
	glGetTypes;
	glGetObjects;
	glGetArraySizes;
	glActiveTypes;
	baseTypes;
	typeSizes;
	pixelStoreiState;
	currentProgram;
	mappedBuffers; // target: {pointer: address, offset: offset, length: mappedLength, access: gl.SOME_FLAGS}
	pointerOfAllExtensionString;
	pointerOfExtensionStrings; // [pointer]
	pointerOfVendorString;
	pointerOfVersionString;
	pointerOfShadingLanguageString;

	makeSureGLESConstants()
	{
		var gl = this.GLContext;
		if(!("DEPTH_BUFFER_BIT" in gl)) gl["DEPTH_BUFFER_BIT"] = 0x00000100;
		if(!("STENCIL_BUFFER_BIT" in gl)) gl["STENCIL_BUFFER_BIT"] = 0x00000400;
		if(!("COLOR_BUFFER_BIT" in gl)) gl["COLOR_BUFFER_BIT"] = 0x00004000;
		if(!("FALSE" in gl)) gl["FALSE"] = 0;
		if(!("TRUE" in gl)) gl["TRUE"] = 1;
		if(!("POINTS" in gl)) gl["POINTS"] = 0x0000;
		if(!("LINES" in gl)) gl["LINES"] = 0x0001;
		if(!("LINE_LOOP" in gl)) gl["LINE_LOOP"] = 0x0002;
		if(!("LINE_STRIP" in gl)) gl["LINE_STRIP"] = 0x0003;
		if(!("TRIANGLES" in gl)) gl["TRIANGLES"] = 0x0004;
		if(!("TRIANGLE_STRIP" in gl)) gl["TRIANGLE_STRIP"] = 0x0005;
		if(!("TRIANGLE_FAN" in gl)) gl["TRIANGLE_FAN"] = 0x0006;
		if(!("ZERO" in gl)) gl["ZERO"] = 0;
		if(!("ONE" in gl)) gl["ONE"] = 1;
		if(!("SRC_COLOR" in gl)) gl["SRC_COLOR"] = 0x0300;
		if(!("ONE_MINUS_SRC_COLOR" in gl)) gl["ONE_MINUS_SRC_COLOR"] = 0x0301;
		if(!("SRC_ALPHA" in gl)) gl["SRC_ALPHA"] = 0x0302;
		if(!("ONE_MINUS_SRC_ALPHA" in gl)) gl["ONE_MINUS_SRC_ALPHA"] = 0x0303;
		if(!("DST_ALPHA" in gl)) gl["DST_ALPHA"] = 0x0304;
		if(!("ONE_MINUS_DST_ALPHA" in gl)) gl["ONE_MINUS_DST_ALPHA"] = 0x0305;
		if(!("DST_COLOR" in gl)) gl["DST_COLOR"] = 0x0306;
		if(!("ONE_MINUS_DST_COLOR" in gl)) gl["ONE_MINUS_DST_COLOR"] = 0x0307;
		if(!("SRC_ALPHA_SATURATE" in gl)) gl["SRC_ALPHA_SATURATE"] = 0x0308;
		if(!("FUNC_ADD" in gl)) gl["FUNC_ADD"] = 0x8006;
		if(!("BLEND_EQUATION" in gl)) gl["BLEND_EQUATION"] = 0x8009;
		if(!("BLEND_EQUATION_RGB" in gl)) gl["BLEND_EQUATION_RGB"] = 0x8009;
		if(!("BLEND_EQUATION_ALPHA" in gl)) gl["BLEND_EQUATION_ALPHA"] = 0x883D;
		if(!("FUNC_SUBTRACT" in gl)) gl["FUNC_SUBTRACT"] = 0x800A;
		if(!("FUNC_REVERSE_SUBTRACT" in gl)) gl["FUNC_REVERSE_SUBTRACT"] = 0x800B;
		if(!("BLEND_DST_RGB" in gl)) gl["BLEND_DST_RGB"] = 0x80C8;
		if(!("BLEND_SRC_RGB" in gl)) gl["BLEND_SRC_RGB"] = 0x80C9;
		if(!("BLEND_DST_ALPHA" in gl)) gl["BLEND_DST_ALPHA"] = 0x80CA;
		if(!("BLEND_SRC_ALPHA" in gl)) gl["BLEND_SRC_ALPHA"] = 0x80CB;
		if(!("CONSTANT_COLOR" in gl)) gl["CONSTANT_COLOR"] = 0x8001;
		if(!("ONE_MINUS_CONSTANT_COLOR" in gl)) gl["ONE_MINUS_CONSTANT_COLOR"] = 0x8002;
		if(!("CONSTANT_ALPHA" in gl)) gl["CONSTANT_ALPHA"] = 0x8003;
		if(!("ONE_MINUS_CONSTANT_ALPHA" in gl)) gl["ONE_MINUS_CONSTANT_ALPHA"] = 0x8004;
		if(!("BLEND_COLOR" in gl)) gl["BLEND_COLOR"] = 0x8005;
		if(!("ARRAY_BUFFER" in gl)) gl["ARRAY_BUFFER"] = 0x8892;
		if(!("ELEMENT_ARRAY_BUFFER" in gl)) gl["ELEMENT_ARRAY_BUFFER"] = 0x8893;
		if(!("ARRAY_BUFFER_BINDING" in gl)) gl["ARRAY_BUFFER_BINDING"] = 0x8894;
		if(!("ELEMENT_ARRAY_BUFFER_BINDING" in gl)) gl["ELEMENT_ARRAY_BUFFER_BINDING"] = 0x8895;
		if(!("STREAM_DRAW" in gl)) gl["STREAM_DRAW"] = 0x88E0;
		if(!("STATIC_DRAW" in gl)) gl["STATIC_DRAW"] = 0x88E4;
		if(!("DYNAMIC_DRAW" in gl)) gl["DYNAMIC_DRAW"] = 0x88E8;
		if(!("BUFFER_SIZE" in gl)) gl["BUFFER_SIZE"] = 0x8764;
		if(!("BUFFER_USAGE" in gl)) gl["BUFFER_USAGE"] = 0x8765;
		if(!("CURRENT_VERTEX_ATTRIB" in gl)) gl["CURRENT_VERTEX_ATTRIB"] = 0x8626;
		if(!("FRONT" in gl)) gl["FRONT"] = 0x0404;
		if(!("BACK" in gl)) gl["BACK"] = 0x0405;
		if(!("FRONT_AND_BACK" in gl)) gl["FRONT_AND_BACK"] = 0x0408;
		if(!("TEXTURE_2D" in gl)) gl["TEXTURE_2D"] = 0x0DE1;
		if(!("CULL_FACE" in gl)) gl["CULL_FACE"] = 0x0B44;
		if(!("BLEND" in gl)) gl["BLEND"] = 0x0BE2;
		if(!("DITHER" in gl)) gl["DITHER"] = 0x0BD0;
		if(!("STENCIL_TEST" in gl)) gl["STENCIL_TEST"] = 0x0B90;
		if(!("DEPTH_TEST" in gl)) gl["DEPTH_TEST"] = 0x0B71;
		if(!("SCISSOR_TEST" in gl)) gl["SCISSOR_TEST"] = 0x0C11;
		if(!("POLYGON_OFFSET_FILL" in gl)) gl["POLYGON_OFFSET_FILL"] = 0x8037;
		if(!("SAMPLE_ALPHA_TO_COVERAGE" in gl)) gl["SAMPLE_ALPHA_TO_COVERAGE"] = 0x809E;
		if(!("SAMPLE_COVERAGE" in gl)) gl["SAMPLE_COVERAGE"] = 0x80A0;
		if(!("NO_ERROR" in gl)) gl["NO_ERROR"] = 0;
		if(!("INVALID_ENUM" in gl)) gl["INVALID_ENUM"] = 0x0500;
		if(!("INVALID_VALUE" in gl)) gl["INVALID_VALUE"] = 0x0501;
		if(!("INVALID_OPERATION" in gl)) gl["INVALID_OPERATION"] = 0x0502;
		if(!("OUT_OF_MEMORY" in gl)) gl["OUT_OF_MEMORY"] = 0x0505;
		if(!("CW" in gl)) gl["CW"] = 0x0900;
		if(!("CCW" in gl)) gl["CCW"] = 0x0901;
		if(!("LINE_WIDTH" in gl)) gl["LINE_WIDTH"] = 0x0B21;
		if(!("ALIASED_POINT_SIZE_RANGE" in gl)) gl["ALIASED_POINT_SIZE_RANGE"] = 0x846D;
		if(!("ALIASED_LINE_WIDTH_RANGE" in gl)) gl["ALIASED_LINE_WIDTH_RANGE"] = 0x846E;
		if(!("CULL_FACE_MODE" in gl)) gl["CULL_FACE_MODE"] = 0x0B45;
		if(!("FRONT_FACE" in gl)) gl["FRONT_FACE"] = 0x0B46;
		if(!("DEPTH_RANGE" in gl)) gl["DEPTH_RANGE"] = 0x0B70;
		if(!("DEPTH_WRITEMASK" in gl)) gl["DEPTH_WRITEMASK"] = 0x0B72;
		if(!("DEPTH_CLEAR_VALUE" in gl)) gl["DEPTH_CLEAR_VALUE"] = 0x0B73;
		if(!("DEPTH_FUNC" in gl)) gl["DEPTH_FUNC"] = 0x0B74;
		if(!("STENCIL_CLEAR_VALUE" in gl)) gl["STENCIL_CLEAR_VALUE"] = 0x0B91;
		if(!("STENCIL_FUNC" in gl)) gl["STENCIL_FUNC"] = 0x0B92;
		if(!("STENCIL_FAIL" in gl)) gl["STENCIL_FAIL"] = 0x0B94;
		if(!("STENCIL_PASS_DEPTH_FAIL" in gl)) gl["STENCIL_PASS_DEPTH_FAIL"] = 0x0B95;
		if(!("STENCIL_PASS_DEPTH_PASS" in gl)) gl["STENCIL_PASS_DEPTH_PASS"] = 0x0B96;
		if(!("STENCIL_REF" in gl)) gl["STENCIL_REF"] = 0x0B97;
		if(!("STENCIL_VALUE_MASK" in gl)) gl["STENCIL_VALUE_MASK"] = 0x0B93;
		if(!("STENCIL_WRITEMASK" in gl)) gl["STENCIL_WRITEMASK"] = 0x0B98;
		if(!("STENCIL_BACK_FUNC" in gl)) gl["STENCIL_BACK_FUNC"] = 0x8800;
		if(!("STENCIL_BACK_FAIL" in gl)) gl["STENCIL_BACK_FAIL"] = 0x8801;
		if(!("STENCIL_BACK_PASS_DEPTH_FAIL" in gl)) gl["STENCIL_BACK_PASS_DEPTH_FAIL"] = 0x8802;
		if(!("STENCIL_BACK_PASS_DEPTH_PASS" in gl)) gl["STENCIL_BACK_PASS_DEPTH_PASS"] = 0x8803;
		if(!("STENCIL_BACK_REF" in gl)) gl["STENCIL_BACK_REF"] = 0x8CA3;
		if(!("STENCIL_BACK_VALUE_MASK" in gl)) gl["STENCIL_BACK_VALUE_MASK"] = 0x8CA4;
		if(!("STENCIL_BACK_WRITEMASK" in gl)) gl["STENCIL_BACK_WRITEMASK"] = 0x8CA5;
		if(!("VIEWPORT" in gl)) gl["VIEWPORT"] = 0x0BA2;
		if(!("SCISSOR_BOX" in gl)) gl["SCISSOR_BOX"] = 0x0C10;
		if(!("COLOR_CLEAR_VALUE" in gl)) gl["COLOR_CLEAR_VALUE"] = 0x0C22;
		if(!("COLOR_WRITEMASK" in gl)) gl["COLOR_WRITEMASK"] = 0x0C23;
		if(!("UNPACK_ALIGNMENT" in gl)) gl["UNPACK_ALIGNMENT"] = 0x0CF5;
		if(!("PACK_ALIGNMENT" in gl)) gl["PACK_ALIGNMENT"] = 0x0D05;
		if(!("MAX_TEXTURE_SIZE" in gl)) gl["MAX_TEXTURE_SIZE"] = 0x0D33;
		if(!("MAX_VIEWPORT_DIMS" in gl)) gl["MAX_VIEWPORT_DIMS"] = 0x0D3A;
		if(!("SUBPIXEL_BITS" in gl)) gl["SUBPIXEL_BITS"] = 0x0D50;
		if(!("RED_BITS" in gl)) gl["RED_BITS"] = 0x0D52;
		if(!("GREEN_BITS" in gl)) gl["GREEN_BITS"] = 0x0D53;
		if(!("BLUE_BITS" in gl)) gl["BLUE_BITS"] = 0x0D54;
		if(!("ALPHA_BITS" in gl)) gl["ALPHA_BITS"] = 0x0D55;
		if(!("DEPTH_BITS" in gl)) gl["DEPTH_BITS"] = 0x0D56;
		if(!("STENCIL_BITS" in gl)) gl["STENCIL_BITS"] = 0x0D57;
		if(!("POLYGON_OFFSET_UNITS" in gl)) gl["POLYGON_OFFSET_UNITS"] = 0x2A00;
		if(!("POLYGON_OFFSET_FACTOR" in gl)) gl["POLYGON_OFFSET_FACTOR"] = 0x8038;
		if(!("TEXTURE_BINDING_2D" in gl)) gl["TEXTURE_BINDING_2D"] = 0x8069;
		if(!("SAMPLE_BUFFERS" in gl)) gl["SAMPLE_BUFFERS"] = 0x80A8;
		if(!("SAMPLES" in gl)) gl["SAMPLES"] = 0x80A9;
		if(!("SAMPLE_COVERAGE_VALUE" in gl)) gl["SAMPLE_COVERAGE_VALUE"] = 0x80AA;
		if(!("SAMPLE_COVERAGE_INVERT" in gl)) gl["SAMPLE_COVERAGE_INVERT"] = 0x80AB;
		if(!("NUM_COMPRESSED_TEXTURE_FORMATS" in gl)) gl["NUM_COMPRESSED_TEXTURE_FORMATS"] = 0x86A2;
		if(!("COMPRESSED_TEXTURE_FORMATS" in gl)) gl["COMPRESSED_TEXTURE_FORMATS"] = 0x86A3;
		if(!("DONT_CARE" in gl)) gl["DONT_CARE"] = 0x1100;
		if(!("FASTEST" in gl)) gl["FASTEST"] = 0x1101;
		if(!("NICEST" in gl)) gl["NICEST"] = 0x1102;
		if(!("GENERATE_MIPMAP_HINT" in gl)) gl["GENERATE_MIPMAP_HINT"] = 0x8192;
		if(!("BYTE" in gl)) gl["BYTE"] = 0x1400;
		if(!("UNSIGNED_BYTE" in gl)) gl["UNSIGNED_BYTE"] = 0x1401;
		if(!("SHORT" in gl)) gl["SHORT"] = 0x1402;
		if(!("UNSIGNED_SHORT" in gl)) gl["UNSIGNED_SHORT"] = 0x1403;
		if(!("INT" in gl)) gl["INT"] = 0x1404;
		if(!("UNSIGNED_INT" in gl)) gl["UNSIGNED_INT"] = 0x1405;
		if(!("FLOAT" in gl)) gl["FLOAT"] = 0x1406;
		if(!("FIXED" in gl)) gl["FIXED"] = 0x140C;
		if(!("DEPTH_COMPONENT" in gl)) gl["DEPTH_COMPONENT"] = 0x1902;
		if(!("ALPHA" in gl)) gl["ALPHA"] = 0x1906;
		if(!("RGB" in gl)) gl["RGB"] = 0x1907;
		if(!("RGBA" in gl)) gl["RGBA"] = 0x1908;
		if(!("LUMINANCE" in gl)) gl["LUMINANCE"] = 0x1909;
		if(!("LUMINANCE_ALPHA" in gl)) gl["LUMINANCE_ALPHA"] = 0x190A;
		if(!("UNSIGNED_SHORT_4_4_4_4" in gl)) gl["UNSIGNED_SHORT_4_4_4_4"] = 0x8033;
		if(!("UNSIGNED_SHORT_5_5_5_1" in gl)) gl["UNSIGNED_SHORT_5_5_5_1"] = 0x8034;
		if(!("UNSIGNED_SHORT_5_6_5" in gl)) gl["UNSIGNED_SHORT_5_6_5"] = 0x8363;
		if(!("FRAGMENT_SHADER" in gl)) gl["FRAGMENT_SHADER"] = 0x8B30;
		if(!("VERTEX_SHADER" in gl)) gl["VERTEX_SHADER"] = 0x8B31;
		if(!("MAX_VERTEX_ATTRIBS" in gl)) gl["MAX_VERTEX_ATTRIBS"] = 0x8869;
		if(!("MAX_VERTEX_UNIFORM_VECTORS" in gl)) gl["MAX_VERTEX_UNIFORM_VECTORS"] = 0x8DFB;
		if(!("MAX_VARYING_VECTORS" in gl)) gl["MAX_VARYING_VECTORS"] = 0x8DFC;
		if(!("MAX_COMBINED_TEXTURE_IMAGE_UNITS" in gl)) gl["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 0x8B4D;
		if(!("MAX_VERTEX_TEXTURE_IMAGE_UNITS" in gl)) gl["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 0x8B4C;
		if(!("MAX_TEXTURE_IMAGE_UNITS" in gl)) gl["MAX_TEXTURE_IMAGE_UNITS"] = 0x8872;
		if(!("MAX_FRAGMENT_UNIFORM_VECTORS" in gl)) gl["MAX_FRAGMENT_UNIFORM_VECTORS"] = 0x8DFD;
		if(!("SHADER_TYPE" in gl)) gl["SHADER_TYPE"] = 0x8B4F;
		if(!("DELETE_STATUS" in gl)) gl["DELETE_STATUS"] = 0x8B80;
		if(!("LINK_STATUS" in gl)) gl["LINK_STATUS"] = 0x8B82;
		if(!("VALIDATE_STATUS" in gl)) gl["VALIDATE_STATUS"] = 0x8B83;
		if(!("ATTACHED_SHADERS" in gl)) gl["ATTACHED_SHADERS"] = 0x8B85;
		if(!("ACTIVE_UNIFORMS" in gl)) gl["ACTIVE_UNIFORMS"] = 0x8B86;
		if(!("ACTIVE_UNIFORM_MAX_LENGTH" in gl)) gl["ACTIVE_UNIFORM_MAX_LENGTH"] = 0x8B87;
		if(!("ACTIVE_ATTRIBUTES" in gl)) gl["ACTIVE_ATTRIBUTES"] = 0x8B89;
		if(!("ACTIVE_ATTRIBUTE_MAX_LENGTH" in gl)) gl["ACTIVE_ATTRIBUTE_MAX_LENGTH"] = 0x8B8A;
		if(!("SHADING_LANGUAGE_VERSION" in gl)) gl["SHADING_LANGUAGE_VERSION"] = 0x8B8C;
		if(!("CURRENT_PROGRAM" in gl)) gl["CURRENT_PROGRAM"] = 0x8B8D;
		if(!("NEVER" in gl)) gl["NEVER"] = 0x0200;
		if(!("LESS" in gl)) gl["LESS"] = 0x0201;
		if(!("EQUAL" in gl)) gl["EQUAL"] = 0x0202;
		if(!("LEQUAL" in gl)) gl["LEQUAL"] = 0x0203;
		if(!("GREATER" in gl)) gl["GREATER"] = 0x0204;
		if(!("NOTEQUAL" in gl)) gl["NOTEQUAL"] = 0x0205;
		if(!("GEQUAL" in gl)) gl["GEQUAL"] = 0x0206;
		if(!("ALWAYS" in gl)) gl["ALWAYS"] = 0x0207;
		if(!("KEEP" in gl)) gl["KEEP"] = 0x1E00;
		if(!("REPLACE" in gl)) gl["REPLACE"] = 0x1E01;
		if(!("INCR" in gl)) gl["INCR"] = 0x1E02;
		if(!("DECR" in gl)) gl["DECR"] = 0x1E03;
		if(!("INVERT" in gl)) gl["INVERT"] = 0x150A;
		if(!("INCR_WRAP" in gl)) gl["INCR_WRAP"] = 0x8507;
		if(!("DECR_WRAP" in gl)) gl["DECR_WRAP"] = 0x8508;
		if(!("VENDOR" in gl)) gl["VENDOR"] = 0x1F00;
		if(!("RENDERER" in gl)) gl["RENDERER"] = 0x1F01;
		if(!("VERSION" in gl)) gl["VERSION"] = 0x1F02;
		if(!("EXTENSIONS" in gl)) gl["EXTENSIONS"] = 0x1F03;
		if(!("NEAREST" in gl)) gl["NEAREST"] = 0x2600;
		if(!("LINEAR" in gl)) gl["LINEAR"] = 0x2601;
		if(!("NEAREST_MIPMAP_NEAREST" in gl)) gl["NEAREST_MIPMAP_NEAREST"] = 0x2700;
		if(!("LINEAR_MIPMAP_NEAREST" in gl)) gl["LINEAR_MIPMAP_NEAREST"] = 0x2701;
		if(!("NEAREST_MIPMAP_LINEAR" in gl)) gl["NEAREST_MIPMAP_LINEAR"] = 0x2702;
		if(!("LINEAR_MIPMAP_LINEAR" in gl)) gl["LINEAR_MIPMAP_LINEAR"] = 0x2703;
		if(!("TEXTURE_MAG_FILTER" in gl)) gl["TEXTURE_MAG_FILTER"] = 0x2800;
		if(!("TEXTURE_MIN_FILTER" in gl)) gl["TEXTURE_MIN_FILTER"] = 0x2801;
		if(!("TEXTURE_WRAP_S" in gl)) gl["TEXTURE_WRAP_S"] = 0x2802;
		if(!("TEXTURE_WRAP_T" in gl)) gl["TEXTURE_WRAP_T"] = 0x2803;
		if(!("TEXTURE" in gl)) gl["TEXTURE"] = 0x1702;
		if(!("TEXTURE_CUBE_MAP" in gl)) gl["TEXTURE_CUBE_MAP"] = 0x8513;
		if(!("TEXTURE_BINDING_CUBE_MAP" in gl)) gl["TEXTURE_BINDING_CUBE_MAP"] = 0x8514;
		if(!("TEXTURE_CUBE_MAP_POSITIVE_X" in gl)) gl["TEXTURE_CUBE_MAP_POSITIVE_X"] = 0x8515;
		if(!("TEXTURE_CUBE_MAP_NEGATIVE_X" in gl)) gl["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 0x8516;
		if(!("TEXTURE_CUBE_MAP_POSITIVE_Y" in gl)) gl["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 0x8517;
		if(!("TEXTURE_CUBE_MAP_NEGATIVE_Y" in gl)) gl["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 0x8518;
		if(!("TEXTURE_CUBE_MAP_POSITIVE_Z" in gl)) gl["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 0x8519;
		if(!("TEXTURE_CUBE_MAP_NEGATIVE_Z" in gl)) gl["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 0x851A;
		if(!("MAX_CUBE_MAP_TEXTURE_SIZE" in gl)) gl["MAX_CUBE_MAP_TEXTURE_SIZE"] = 0x851C;
		if(!("TEXTURE0" in gl)) gl["TEXTURE0"] = 0x84C0;
		if(!("TEXTURE1" in gl)) gl["TEXTURE1"] = 0x84C1;
		if(!("TEXTURE2" in gl)) gl["TEXTURE2"] = 0x84C2;
		if(!("TEXTURE3" in gl)) gl["TEXTURE3"] = 0x84C3;
		if(!("TEXTURE4" in gl)) gl["TEXTURE4"] = 0x84C4;
		if(!("TEXTURE5" in gl)) gl["TEXTURE5"] = 0x84C5;
		if(!("TEXTURE6" in gl)) gl["TEXTURE6"] = 0x84C6;
		if(!("TEXTURE7" in gl)) gl["TEXTURE7"] = 0x84C7;
		if(!("TEXTURE8" in gl)) gl["TEXTURE8"] = 0x84C8;
		if(!("TEXTURE9" in gl)) gl["TEXTURE9"] = 0x84C9;
		if(!("TEXTURE10" in gl)) gl["TEXTURE10"] = 0x84CA;
		if(!("TEXTURE11" in gl)) gl["TEXTURE11"] = 0x84CB;
		if(!("TEXTURE12" in gl)) gl["TEXTURE12"] = 0x84CC;
		if(!("TEXTURE13" in gl)) gl["TEXTURE13"] = 0x84CD;
		if(!("TEXTURE14" in gl)) gl["TEXTURE14"] = 0x84CE;
		if(!("TEXTURE15" in gl)) gl["TEXTURE15"] = 0x84CF;
		if(!("TEXTURE16" in gl)) gl["TEXTURE16"] = 0x84D0;
		if(!("TEXTURE17" in gl)) gl["TEXTURE17"] = 0x84D1;
		if(!("TEXTURE18" in gl)) gl["TEXTURE18"] = 0x84D2;
		if(!("TEXTURE19" in gl)) gl["TEXTURE19"] = 0x84D3;
		if(!("TEXTURE20" in gl)) gl["TEXTURE20"] = 0x84D4;
		if(!("TEXTURE21" in gl)) gl["TEXTURE21"] = 0x84D5;
		if(!("TEXTURE22" in gl)) gl["TEXTURE22"] = 0x84D6;
		if(!("TEXTURE23" in gl)) gl["TEXTURE23"] = 0x84D7;
		if(!("TEXTURE24" in gl)) gl["TEXTURE24"] = 0x84D8;
		if(!("TEXTURE25" in gl)) gl["TEXTURE25"] = 0x84D9;
		if(!("TEXTURE26" in gl)) gl["TEXTURE26"] = 0x84DA;
		if(!("TEXTURE27" in gl)) gl["TEXTURE27"] = 0x84DB;
		if(!("TEXTURE28" in gl)) gl["TEXTURE28"] = 0x84DC;
		if(!("TEXTURE29" in gl)) gl["TEXTURE29"] = 0x84DD;
		if(!("TEXTURE30" in gl)) gl["TEXTURE30"] = 0x84DE;
		if(!("TEXTURE31" in gl)) gl["TEXTURE31"] = 0x84DF;
		if(!("ACTIVE_TEXTURE" in gl)) gl["ACTIVE_TEXTURE"] = 0x84E0;
		if(!("REPEAT" in gl)) gl["REPEAT"] = 0x2901;
		if(!("CLAMP_TO_EDGE" in gl)) gl["CLAMP_TO_EDGE"] = 0x812F;
		if(!("MIRRORED_REPEAT" in gl)) gl["MIRRORED_REPEAT"] = 0x8370;
		if(!("FLOAT_VEC2" in gl)) gl["FLOAT_VEC2"] = 0x8B50;
		if(!("FLOAT_VEC3" in gl)) gl["FLOAT_VEC3"] = 0x8B51;
		if(!("FLOAT_VEC4" in gl)) gl["FLOAT_VEC4"] = 0x8B52;
		if(!("INT_VEC2" in gl)) gl["INT_VEC2"] = 0x8B53;
		if(!("INT_VEC3" in gl)) gl["INT_VEC3"] = 0x8B54;
		if(!("INT_VEC4" in gl)) gl["INT_VEC4"] = 0x8B55;
		if(!("BOOL" in gl)) gl["BOOL"] = 0x8B56;
		if(!("BOOL_VEC2" in gl)) gl["BOOL_VEC2"] = 0x8B57;
		if(!("BOOL_VEC3" in gl)) gl["BOOL_VEC3"] = 0x8B58;
		if(!("BOOL_VEC4" in gl)) gl["BOOL_VEC4"] = 0x8B59;
		if(!("FLOAT_MAT2" in gl)) gl["FLOAT_MAT2"] = 0x8B5A;
		if(!("FLOAT_MAT3" in gl)) gl["FLOAT_MAT3"] = 0x8B5B;
		if(!("FLOAT_MAT4" in gl)) gl["FLOAT_MAT4"] = 0x8B5C;
		if(!("SAMPLER_2D" in gl)) gl["SAMPLER_2D"] = 0x8B5E;
		if(!("SAMPLER_CUBE" in gl)) gl["SAMPLER_CUBE"] = 0x8B60;
		if(!("VERTEX_ATTRIB_ARRAY_ENABLED" in gl)) gl["VERTEX_ATTRIB_ARRAY_ENABLED"] = 0x8622;
		if(!("VERTEX_ATTRIB_ARRAY_SIZE" in gl)) gl["VERTEX_ATTRIB_ARRAY_SIZE"] = 0x8623;
		if(!("VERTEX_ATTRIB_ARRAY_STRIDE" in gl)) gl["VERTEX_ATTRIB_ARRAY_STRIDE"] = 0x8624;
		if(!("VERTEX_ATTRIB_ARRAY_TYPE" in gl)) gl["VERTEX_ATTRIB_ARRAY_TYPE"] = 0x8625;
		if(!("VERTEX_ATTRIB_ARRAY_NORMALIZED" in gl)) gl["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 0x886A;
		if(!("VERTEX_ATTRIB_ARRAY_POINTER" in gl)) gl["VERTEX_ATTRIB_ARRAY_POINTER"] = 0x8645;
		if(!("VERTEX_ATTRIB_ARRAY_BUFFER_BINDING" in gl)) gl["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 0x889F;
		if(!("IMPLEMENTATION_COLOR_READ_TYPE" in gl)) gl["IMPLEMENTATION_COLOR_READ_TYPE"] = 0x8B9A;
		if(!("IMPLEMENTATION_COLOR_READ_FORMAT" in gl)) gl["IMPLEMENTATION_COLOR_READ_FORMAT"] = 0x8B9B;
		if(!("COMPILE_STATUS" in gl)) gl["COMPILE_STATUS"] = 0x8B81;
		if(!("INFO_LOG_LENGTH" in gl)) gl["INFO_LOG_LENGTH"] = 0x8B84;
		if(!("SHADER_SOURCE_LENGTH" in gl)) gl["SHADER_SOURCE_LENGTH"] = 0x8B88;
		if(!("SHADER_COMPILER" in gl)) gl["SHADER_COMPILER"] = 0x8DFA;
		if(!("SHADER_BINARY_FORMATS" in gl)) gl["SHADER_BINARY_FORMATS"] = 0x8DF8;
		if(!("NUM_SHADER_BINARY_FORMATS" in gl)) gl["NUM_SHADER_BINARY_FORMATS"] = 0x8DF9;
		if(!("LOW_FLOAT" in gl)) gl["LOW_FLOAT"] = 0x8DF0;
		if(!("MEDIUM_FLOAT" in gl)) gl["MEDIUM_FLOAT"] = 0x8DF1;
		if(!("HIGH_FLOAT" in gl)) gl["HIGH_FLOAT"] = 0x8DF2;
		if(!("LOW_INT" in gl)) gl["LOW_INT"] = 0x8DF3;
		if(!("MEDIUM_INT" in gl)) gl["MEDIUM_INT"] = 0x8DF4;
		if(!("HIGH_INT" in gl)) gl["HIGH_INT"] = 0x8DF5;
		if(!("FRAMEBUFFER" in gl)) gl["FRAMEBUFFER"] = 0x8D40;
		if(!("RENDERBUFFER" in gl)) gl["RENDERBUFFER"] = 0x8D41;
		if(!("RGBA4" in gl)) gl["RGBA4"] = 0x8056;
		if(!("RGB5_A1" in gl)) gl["RGB5_A1"] = 0x8057;
		if(!("RGB565" in gl)) gl["RGB565"] = 0x8D62;
		if(!("DEPTH_COMPONENT16" in gl)) gl["DEPTH_COMPONENT16"] = 0x81A5;
		if(!("STENCIL_INDEX8" in gl)) gl["STENCIL_INDEX8"] = 0x8D48;
		if(!("RENDERBUFFER_WIDTH" in gl)) gl["RENDERBUFFER_WIDTH"] = 0x8D42;
		if(!("RENDERBUFFER_HEIGHT" in gl)) gl["RENDERBUFFER_HEIGHT"] = 0x8D43;
		if(!("RENDERBUFFER_INTERNAL_FORMAT" in gl)) gl["RENDERBUFFER_INTERNAL_FORMAT"] = 0x8D44;
		if(!("RENDERBUFFER_RED_SIZE" in gl)) gl["RENDERBUFFER_RED_SIZE"] = 0x8D50;
		if(!("RENDERBUFFER_GREEN_SIZE" in gl)) gl["RENDERBUFFER_GREEN_SIZE"] = 0x8D51;
		if(!("RENDERBUFFER_BLUE_SIZE" in gl)) gl["RENDERBUFFER_BLUE_SIZE"] = 0x8D52;
		if(!("RENDERBUFFER_ALPHA_SIZE" in gl)) gl["RENDERBUFFER_ALPHA_SIZE"] = 0x8D53;
		if(!("RENDERBUFFER_DEPTH_SIZE" in gl)) gl["RENDERBUFFER_DEPTH_SIZE"] = 0x8D54;
		if(!("RENDERBUFFER_STENCIL_SIZE" in gl)) gl["RENDERBUFFER_STENCIL_SIZE"] = 0x8D55;
		if(!("FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 0x8CD0;
		if(!("FRAMEBUFFER_ATTACHMENT_OBJECT_NAME" in gl)) gl["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 0x8CD1;
		if(!("FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL" in gl)) gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 0x8CD2;
		if(!("FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 0x8CD3;
		if(!("COLOR_ATTACHMENT0" in gl)) gl["COLOR_ATTACHMENT0"] = 0x8CE0;
		if(!("DEPTH_ATTACHMENT" in gl)) gl["DEPTH_ATTACHMENT"] = 0x8D00;
		if(!("STENCIL_ATTACHMENT" in gl)) gl["STENCIL_ATTACHMENT"] = 0x8D20;
		if(!("NONE" in gl)) gl["NONE"] = 0;
		if(!("FRAMEBUFFER_COMPLETE" in gl)) gl["FRAMEBUFFER_COMPLETE"] = 0x8CD5;
		if(!("FRAMEBUFFER_INCOMPLETE_ATTACHMENT" in gl)) gl["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 0x8CD6;
		if(!("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT" in gl)) gl["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 0x8CD7;
		if(!("FRAMEBUFFER_INCOMPLETE_DIMENSIONS" in gl)) gl["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 0x8CD9;
		if(!("FRAMEBUFFER_UNSUPPORTED" in gl)) gl["FRAMEBUFFER_UNSUPPORTED"] = 0x8CDD;
		if(!("FRAMEBUFFER_BINDING" in gl)) gl["FRAMEBUFFER_BINDING"] = 0x8CA6;
		if(!("RENDERBUFFER_BINDING" in gl)) gl["RENDERBUFFER_BINDING"] = 0x8CA7;
		if(!("MAX_RENDERBUFFER_SIZE" in gl)) gl["MAX_RENDERBUFFER_SIZE"] = 0x84E8;
		if(!("INVALID_FRAMEBUFFER_OPERATION" in gl)) gl["INVALID_FRAMEBUFFER_OPERATION"] = 0x0506;
		if(!("READ_BUFFER" in gl)) gl["READ_BUFFER"] = 0x0C02;
		if(!("UNPACK_ROW_LENGTH" in gl)) gl["UNPACK_ROW_LENGTH"] = 0x0CF2;
		if(!("UNPACK_SKIP_ROWS" in gl)) gl["UNPACK_SKIP_ROWS"] = 0x0CF3;
		if(!("UNPACK_SKIP_PIXELS" in gl)) gl["UNPACK_SKIP_PIXELS"] = 0x0CF4;
		if(!("PACK_ROW_LENGTH" in gl)) gl["PACK_ROW_LENGTH"] = 0x0D02;
		if(!("PACK_SKIP_ROWS" in gl)) gl["PACK_SKIP_ROWS"] = 0x0D03;
		if(!("PACK_SKIP_PIXELS" in gl)) gl["PACK_SKIP_PIXELS"] = 0x0D04;
		if(!("COLOR" in gl)) gl["COLOR"] = 0x1800;
		if(!("DEPTH" in gl)) gl["DEPTH"] = 0x1801;
		if(!("STENCIL" in gl)) gl["STENCIL"] = 0x1802;
		if(!("RED" in gl)) gl["RED"] = 0x1903;
		if(!("RGB8" in gl)) gl["RGB8"] = 0x8051;
		if(!("RGBA8" in gl)) gl["RGBA8"] = 0x8058;
		if(!("RGB10_A2" in gl)) gl["RGB10_A2"] = 0x8059;
		if(!("TEXTURE_BINDING_3D" in gl)) gl["TEXTURE_BINDING_3D"] = 0x806A;
		if(!("UNPACK_SKIP_IMAGES" in gl)) gl["UNPACK_SKIP_IMAGES"] = 0x806D;
		if(!("UNPACK_IMAGE_HEIGHT" in gl)) gl["UNPACK_IMAGE_HEIGHT"] = 0x806E;
		if(!("TEXTURE_3D" in gl)) gl["TEXTURE_3D"] = 0x806F;
		if(!("TEXTURE_WRAP_R" in gl)) gl["TEXTURE_WRAP_R"] = 0x8072;
		if(!("MAX_3D_TEXTURE_SIZE" in gl)) gl["MAX_3D_TEXTURE_SIZE"] = 0x8073;
		if(!("UNSIGNED_INT_2_10_10_10_REV" in gl)) gl["UNSIGNED_INT_2_10_10_10_REV"] = 0x8368;
		if(!("MAX_ELEMENTS_VERTICES" in gl)) gl["MAX_ELEMENTS_VERTICES"] = 0x80E8;
		if(!("MAX_ELEMENTS_INDICES" in gl)) gl["MAX_ELEMENTS_INDICES"] = 0x80E9;
		if(!("TEXTURE_MIN_LOD" in gl)) gl["TEXTURE_MIN_LOD"] = 0x813A;
		if(!("TEXTURE_MAX_LOD" in gl)) gl["TEXTURE_MAX_LOD"] = 0x813B;
		if(!("TEXTURE_BASE_LEVEL" in gl)) gl["TEXTURE_BASE_LEVEL"] = 0x813C;
		if(!("TEXTURE_MAX_LEVEL" in gl)) gl["TEXTURE_MAX_LEVEL"] = 0x813D;
		if(!("MIN" in gl)) gl["MIN"] = 0x8007;
		if(!("MAX" in gl)) gl["MAX"] = 0x8008;
		if(!("DEPTH_COMPONENT24" in gl)) gl["DEPTH_COMPONENT24"] = 0x81A6;
		if(!("MAX_TEXTURE_LOD_BIAS" in gl)) gl["MAX_TEXTURE_LOD_BIAS"] = 0x84FD;
		if(!("TEXTURE_COMPARE_MODE" in gl)) gl["TEXTURE_COMPARE_MODE"] = 0x884C;
		if(!("TEXTURE_COMPARE_FUNC" in gl)) gl["TEXTURE_COMPARE_FUNC"] = 0x884D;
		if(!("CURRENT_QUERY" in gl)) gl["CURRENT_QUERY"] = 0x8865;
		if(!("QUERY_RESULT" in gl)) gl["QUERY_RESULT"] = 0x8866;
		if(!("QUERY_RESULT_AVAILABLE" in gl)) gl["QUERY_RESULT_AVAILABLE"] = 0x8867;
		if(!("BUFFER_MAPPED" in gl)) gl["BUFFER_MAPPED"] = 0x88BC;
		if(!("BUFFER_MAP_POINTER" in gl)) gl["BUFFER_MAP_POINTER"] = 0x88BD;
		if(!("STREAM_READ" in gl)) gl["STREAM_READ"] = 0x88E1;
		if(!("STREAM_COPY" in gl)) gl["STREAM_COPY"] = 0x88E2;
		if(!("STATIC_READ" in gl)) gl["STATIC_READ"] = 0x88E5;
		if(!("STATIC_COPY" in gl)) gl["STATIC_COPY"] = 0x88E6;
		if(!("DYNAMIC_READ" in gl)) gl["DYNAMIC_READ"] = 0x88E9;
		if(!("DYNAMIC_COPY" in gl)) gl["DYNAMIC_COPY"] = 0x88EA;
		if(!("MAX_DRAW_BUFFERS" in gl)) gl["MAX_DRAW_BUFFERS"] = 0x8824;
		if(!("DRAW_BUFFER0" in gl)) gl["DRAW_BUFFER0"] = 0x8825;
		if(!("DRAW_BUFFER1" in gl)) gl["DRAW_BUFFER1"] = 0x8826;
		if(!("DRAW_BUFFER2" in gl)) gl["DRAW_BUFFER2"] = 0x8827;
		if(!("DRAW_BUFFER3" in gl)) gl["DRAW_BUFFER3"] = 0x8828;
		if(!("DRAW_BUFFER4" in gl)) gl["DRAW_BUFFER4"] = 0x8829;
		if(!("DRAW_BUFFER5" in gl)) gl["DRAW_BUFFER5"] = 0x882A;
		if(!("DRAW_BUFFER6" in gl)) gl["DRAW_BUFFER6"] = 0x882B;
		if(!("DRAW_BUFFER7" in gl)) gl["DRAW_BUFFER7"] = 0x882C;
		if(!("DRAW_BUFFER8" in gl)) gl["DRAW_BUFFER8"] = 0x882D;
		if(!("DRAW_BUFFER9" in gl)) gl["DRAW_BUFFER9"] = 0x882E;
		if(!("DRAW_BUFFER10" in gl)) gl["DRAW_BUFFER10"] = 0x882F;
		if(!("DRAW_BUFFER11" in gl)) gl["DRAW_BUFFER11"] = 0x8830;
		if(!("DRAW_BUFFER12" in gl)) gl["DRAW_BUFFER12"] = 0x8831;
		if(!("DRAW_BUFFER13" in gl)) gl["DRAW_BUFFER13"] = 0x8832;
		if(!("DRAW_BUFFER14" in gl)) gl["DRAW_BUFFER14"] = 0x8833;
		if(!("DRAW_BUFFER15" in gl)) gl["DRAW_BUFFER15"] = 0x8834;
		if(!("MAX_FRAGMENT_UNIFORM_COMPONENTS" in gl)) gl["MAX_FRAGMENT_UNIFORM_COMPONENTS"] = 0x8B49;
		if(!("MAX_VERTEX_UNIFORM_COMPONENTS" in gl)) gl["MAX_VERTEX_UNIFORM_COMPONENTS"] = 0x8B4A;
		if(!("SAMPLER_3D" in gl)) gl["SAMPLER_3D"] = 0x8B5F;
		if(!("SAMPLER_2D_SHADOW" in gl)) gl["SAMPLER_2D_SHADOW"] = 0x8B62;
		if(!("FRAGMENT_SHADER_DERIVATIVE_HINT" in gl)) gl["FRAGMENT_SHADER_DERIVATIVE_HINT"] = 0x8B8B;
		if(!("PIXEL_PACK_BUFFER" in gl)) gl["PIXEL_PACK_BUFFER"] = 0x88EB;
		if(!("PIXEL_UNPACK_BUFFER" in gl)) gl["PIXEL_UNPACK_BUFFER"] = 0x88EC;
		if(!("PIXEL_PACK_BUFFER_BINDING" in gl)) gl["PIXEL_PACK_BUFFER_BINDING"] = 0x88ED;
		if(!("PIXEL_UNPACK_BUFFER_BINDING" in gl)) gl["PIXEL_UNPACK_BUFFER_BINDING"] = 0x88EF;
		if(!("FLOAT_MAT2x3" in gl)) gl["FLOAT_MAT2x3"] = 0x8B65;
		if(!("FLOAT_MAT2x4" in gl)) gl["FLOAT_MAT2x4"] = 0x8B66;
		if(!("FLOAT_MAT3x2" in gl)) gl["FLOAT_MAT3x2"] = 0x8B67;
		if(!("FLOAT_MAT3x4" in gl)) gl["FLOAT_MAT3x4"] = 0x8B68;
		if(!("FLOAT_MAT4x2" in gl)) gl["FLOAT_MAT4x2"] = 0x8B69;
		if(!("FLOAT_MAT4x3" in gl)) gl["FLOAT_MAT4x3"] = 0x8B6A;
		if(!("SRGB" in gl)) gl["SRGB"] = 0x8C40;
		if(!("SRGB8" in gl)) gl["SRGB8"] = 0x8C41;
		if(!("SRGB8_ALPHA8" in gl)) gl["SRGB8_ALPHA8"] = 0x8C43;
		if(!("COMPARE_REF_TO_TEXTURE" in gl)) gl["COMPARE_REF_TO_TEXTURE"] = 0x884E;
		if(!("MAJOR_VERSION" in gl)) gl["MAJOR_VERSION"] = 0x821B;
		if(!("MINOR_VERSION" in gl)) gl["MINOR_VERSION"] = 0x821C;
		if(!("NUM_EXTENSIONS" in gl)) gl["NUM_EXTENSIONS"] = 0x821D;
		if(!("RGBA32F" in gl)) gl["RGBA32F"] = 0x8814;
		if(!("RGB32F" in gl)) gl["RGB32F"] = 0x8815;
		if(!("RGBA16F" in gl)) gl["RGBA16F"] = 0x881A;
		if(!("RGB16F" in gl)) gl["RGB16F"] = 0x881B;
		if(!("VERTEX_ATTRIB_ARRAY_INTEGER" in gl)) gl["VERTEX_ATTRIB_ARRAY_INTEGER"] = 0x88FD;
		if(!("MAX_ARRAY_TEXTURE_LAYERS" in gl)) gl["MAX_ARRAY_TEXTURE_LAYERS"] = 0x88FF;
		if(!("MIN_PROGRAM_TEXEL_OFFSET" in gl)) gl["MIN_PROGRAM_TEXEL_OFFSET"] = 0x8904;
		if(!("MAX_PROGRAM_TEXEL_OFFSET" in gl)) gl["MAX_PROGRAM_TEXEL_OFFSET"] = 0x8905;
		if(!("MAX_VARYING_COMPONENTS" in gl)) gl["MAX_VARYING_COMPONENTS"] = 0x8B4B;
		if(!("TEXTURE_2D_ARRAY" in gl)) gl["TEXTURE_2D_ARRAY"] = 0x8C1A;
		if(!("TEXTURE_BINDING_2D_ARRAY" in gl)) gl["TEXTURE_BINDING_2D_ARRAY"] = 0x8C1D;
		if(!("R11F_G11F_B10F" in gl)) gl["R11F_G11F_B10F"] = 0x8C3A;
		if(!("UNSIGNED_INT_10F_11F_11F_REV" in gl)) gl["UNSIGNED_INT_10F_11F_11F_REV"] = 0x8C3B;
		if(!("RGB9_E5" in gl)) gl["RGB9_E5"] = 0x8C3D;
		if(!("UNSIGNED_INT_5_9_9_9_REV" in gl)) gl["UNSIGNED_INT_5_9_9_9_REV"] = 0x8C3E;
		if(!("TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH" in gl)) gl["TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH"] = 0x8C76;
		if(!("TRANSFORM_FEEDBACK_BUFFER_MODE" in gl)) gl["TRANSFORM_FEEDBACK_BUFFER_MODE"] = 0x8C7F;
		if(!("MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS" in gl)) gl["MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"] = 0x8C80;
		if(!("TRANSFORM_FEEDBACK_VARYINGS" in gl)) gl["TRANSFORM_FEEDBACK_VARYINGS"] = 0x8C83;
		if(!("TRANSFORM_FEEDBACK_BUFFER_START" in gl)) gl["TRANSFORM_FEEDBACK_BUFFER_START"] = 0x8C84;
		if(!("TRANSFORM_FEEDBACK_BUFFER_SIZE" in gl)) gl["TRANSFORM_FEEDBACK_BUFFER_SIZE"] = 0x8C85;
		if(!("TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN" in gl)) gl["TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN"] = 0x8C88;
		if(!("RASTERIZER_DISCARD" in gl)) gl["RASTERIZER_DISCARD"] = 0x8C89;
		if(!("MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS" in gl)) gl["MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS"] = 0x8C8A;
		if(!("MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS" in gl)) gl["MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS"] = 0x8C8B;
		if(!("INTERLEAVED_ATTRIBS" in gl)) gl["INTERLEAVED_ATTRIBS"] = 0x8C8C;
		if(!("SEPARATE_ATTRIBS" in gl)) gl["SEPARATE_ATTRIBS"] = 0x8C8D;
		if(!("TRANSFORM_FEEDBACK_BUFFER" in gl)) gl["TRANSFORM_FEEDBACK_BUFFER"] = 0x8C8E;
		if(!("TRANSFORM_FEEDBACK_BUFFER_BINDING" in gl)) gl["TRANSFORM_FEEDBACK_BUFFER_BINDING"] = 0x8C8F;
		if(!("RGBA32UI" in gl)) gl["RGBA32UI"] = 0x8D70;
		if(!("RGB32UI" in gl)) gl["RGB32UI"] = 0x8D71;
		if(!("RGBA16UI" in gl)) gl["RGBA16UI"] = 0x8D76;
		if(!("RGB16UI" in gl)) gl["RGB16UI"] = 0x8D77;
		if(!("RGBA8UI" in gl)) gl["RGBA8UI"] = 0x8D7C;
		if(!("RGB8UI" in gl)) gl["RGB8UI"] = 0x8D7D;
		if(!("RGBA32I" in gl)) gl["RGBA32I"] = 0x8D82;
		if(!("RGB32I" in gl)) gl["RGB32I"] = 0x8D83;
		if(!("RGBA16I" in gl)) gl["RGBA16I"] = 0x8D88;
		if(!("RGB16I" in gl)) gl["RGB16I"] = 0x8D89;
		if(!("RGBA8I" in gl)) gl["RGBA8I"] = 0x8D8E;
		if(!("RGB8I" in gl)) gl["RGB8I"] = 0x8D8F;
		if(!("RED_INTEGER" in gl)) gl["RED_INTEGER"] = 0x8D94;
		if(!("RGB_INTEGER" in gl)) gl["RGB_INTEGER"] = 0x8D98;
		if(!("RGBA_INTEGER" in gl)) gl["RGBA_INTEGER"] = 0x8D99;
		if(!("SAMPLER_2D_ARRAY" in gl)) gl["SAMPLER_2D_ARRAY"] = 0x8DC1;
		if(!("SAMPLER_2D_ARRAY_SHADOW" in gl)) gl["SAMPLER_2D_ARRAY_SHADOW"] = 0x8DC4;
		if(!("SAMPLER_CUBE_SHADOW" in gl)) gl["SAMPLER_CUBE_SHADOW"] = 0x8DC5;
		if(!("UNSIGNED_INT_VEC2" in gl)) gl["UNSIGNED_INT_VEC2"] = 0x8DC6;
		if(!("UNSIGNED_INT_VEC3" in gl)) gl["UNSIGNED_INT_VEC3"] = 0x8DC7;
		if(!("UNSIGNED_INT_VEC4" in gl)) gl["UNSIGNED_INT_VEC4"] = 0x8DC8;
		if(!("INT_SAMPLER_2D" in gl)) gl["INT_SAMPLER_2D"] = 0x8DCA;
		if(!("INT_SAMPLER_3D" in gl)) gl["INT_SAMPLER_3D"] = 0x8DCB;
		if(!("INT_SAMPLER_CUBE" in gl)) gl["INT_SAMPLER_CUBE"] = 0x8DCC;
		if(!("INT_SAMPLER_2D_ARRAY" in gl)) gl["INT_SAMPLER_2D_ARRAY"] = 0x8DCF;
		if(!("UNSIGNED_INT_SAMPLER_2D" in gl)) gl["UNSIGNED_INT_SAMPLER_2D"] = 0x8DD2;
		if(!("UNSIGNED_INT_SAMPLER_3D" in gl)) gl["UNSIGNED_INT_SAMPLER_3D"] = 0x8DD3;
		if(!("UNSIGNED_INT_SAMPLER_CUBE" in gl)) gl["UNSIGNED_INT_SAMPLER_CUBE"] = 0x8DD4;
		if(!("UNSIGNED_INT_SAMPLER_2D_ARRAY" in gl)) gl["UNSIGNED_INT_SAMPLER_2D_ARRAY"] = 0x8DD7;
		if(!("BUFFER_ACCESS_FLAGS" in gl)) gl["BUFFER_ACCESS_FLAGS"] = 0x911F;
		if(!("BUFFER_MAP_LENGTH" in gl)) gl["BUFFER_MAP_LENGTH"] = 0x9120;
		if(!("BUFFER_MAP_OFFSET" in gl)) gl["BUFFER_MAP_OFFSET"] = 0x9121;
		if(!("DEPTH_COMPONENT32F" in gl)) gl["DEPTH_COMPONENT32F"] = 0x8CAC;
		if(!("DEPTH32F_STENCIL8" in gl)) gl["DEPTH32F_STENCIL8"] = 0x8CAD;
		if(!("FLOAT_32_UNSIGNED_INT_24_8_REV" in gl)) gl["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 0x8DAD;
		if(!("FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING" in gl)) gl["FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING"] = 0x8210;
		if(!("FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE"] = 0x8211;
		if(!("FRAMEBUFFER_ATTACHMENT_RED_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_RED_SIZE"] = 0x8212;
		if(!("FRAMEBUFFER_ATTACHMENT_GREEN_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_GREEN_SIZE"] = 0x8213;
		if(!("FRAMEBUFFER_ATTACHMENT_BLUE_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_BLUE_SIZE"] = 0x8214;
		if(!("FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE"] = 0x8215;
		if(!("FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE"] = 0x8216;
		if(!("FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE" in gl)) gl["FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE"] = 0x8217;
		if(!("FRAMEBUFFER_DEFAULT" in gl)) gl["FRAMEBUFFER_DEFAULT"] = 0x8218;
		if(!("FRAMEBUFFER_UNDEFINED" in gl)) gl["FRAMEBUFFER_UNDEFINED"] = 0x8219;
		if(!("DEPTH_STENCIL_ATTACHMENT" in gl)) gl["DEPTH_STENCIL_ATTACHMENT"] = 0x821A;
		if(!("DEPTH_STENCIL" in gl)) gl["DEPTH_STENCIL"] = 0x84F9;
		if(!("UNSIGNED_INT_24_8" in gl)) gl["UNSIGNED_INT_24_8"] = 0x84FA;
		if(!("DEPTH24_STENCIL8" in gl)) gl["DEPTH24_STENCIL8"] = 0x88F0;
		if(!("UNSIGNED_NORMALIZED" in gl)) gl["UNSIGNED_NORMALIZED"] = 0x8C17;
		if(!("DRAW_FRAMEBUFFER_BINDING" in gl)) gl["DRAW_FRAMEBUFFER_BINDING"] = 0x8CA6;
		if(!("READ_FRAMEBUFFER" in gl)) gl["READ_FRAMEBUFFER"] = 0x8CA8;
		if(!("DRAW_FRAMEBUFFER" in gl)) gl["DRAW_FRAMEBUFFER"] = 0x8CA9;
		if(!("READ_FRAMEBUFFER_BINDING" in gl)) gl["READ_FRAMEBUFFER_BINDING"] = 0x8CAA;
		if(!("RENDERBUFFER_SAMPLES" in gl)) gl["RENDERBUFFER_SAMPLES"] = 0x8CAB;
		if(!("FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER" in gl)) gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER"] = 0x8CD4;
		if(!("MAX_COLOR_ATTACHMENTS" in gl)) gl["MAX_COLOR_ATTACHMENTS"] = 0x8CDF;
		if(!("COLOR_ATTACHMENT1" in gl)) gl["COLOR_ATTACHMENT1"] = 0x8CE1;
		if(!("COLOR_ATTACHMENT2" in gl)) gl["COLOR_ATTACHMENT2"] = 0x8CE2;
		if(!("COLOR_ATTACHMENT3" in gl)) gl["COLOR_ATTACHMENT3"] = 0x8CE3;
		if(!("COLOR_ATTACHMENT4" in gl)) gl["COLOR_ATTACHMENT4"] = 0x8CE4;
		if(!("COLOR_ATTACHMENT5" in gl)) gl["COLOR_ATTACHMENT5"] = 0x8CE5;
		if(!("COLOR_ATTACHMENT6" in gl)) gl["COLOR_ATTACHMENT6"] = 0x8CE6;
		if(!("COLOR_ATTACHMENT7" in gl)) gl["COLOR_ATTACHMENT7"] = 0x8CE7;
		if(!("COLOR_ATTACHMENT8" in gl)) gl["COLOR_ATTACHMENT8"] = 0x8CE8;
		if(!("COLOR_ATTACHMENT9" in gl)) gl["COLOR_ATTACHMENT9"] = 0x8CE9;
		if(!("COLOR_ATTACHMENT10" in gl)) gl["COLOR_ATTACHMENT10"] = 0x8CEA;
		if(!("COLOR_ATTACHMENT11" in gl)) gl["COLOR_ATTACHMENT11"] = 0x8CEB;
		if(!("COLOR_ATTACHMENT12" in gl)) gl["COLOR_ATTACHMENT12"] = 0x8CEC;
		if(!("COLOR_ATTACHMENT13" in gl)) gl["COLOR_ATTACHMENT13"] = 0x8CED;
		if(!("COLOR_ATTACHMENT14" in gl)) gl["COLOR_ATTACHMENT14"] = 0x8CEE;
		if(!("COLOR_ATTACHMENT15" in gl)) gl["COLOR_ATTACHMENT15"] = 0x8CEF;
		if(!("COLOR_ATTACHMENT16" in gl)) gl["COLOR_ATTACHMENT16"] = 0x8CF0;
		if(!("COLOR_ATTACHMENT17" in gl)) gl["COLOR_ATTACHMENT17"] = 0x8CF1;
		if(!("COLOR_ATTACHMENT18" in gl)) gl["COLOR_ATTACHMENT18"] = 0x8CF2;
		if(!("COLOR_ATTACHMENT19" in gl)) gl["COLOR_ATTACHMENT19"] = 0x8CF3;
		if(!("COLOR_ATTACHMENT20" in gl)) gl["COLOR_ATTACHMENT20"] = 0x8CF4;
		if(!("COLOR_ATTACHMENT21" in gl)) gl["COLOR_ATTACHMENT21"] = 0x8CF5;
		if(!("COLOR_ATTACHMENT22" in gl)) gl["COLOR_ATTACHMENT22"] = 0x8CF6;
		if(!("COLOR_ATTACHMENT23" in gl)) gl["COLOR_ATTACHMENT23"] = 0x8CF7;
		if(!("COLOR_ATTACHMENT24" in gl)) gl["COLOR_ATTACHMENT24"] = 0x8CF8;
		if(!("COLOR_ATTACHMENT25" in gl)) gl["COLOR_ATTACHMENT25"] = 0x8CF9;
		if(!("COLOR_ATTACHMENT26" in gl)) gl["COLOR_ATTACHMENT26"] = 0x8CFA;
		if(!("COLOR_ATTACHMENT27" in gl)) gl["COLOR_ATTACHMENT27"] = 0x8CFB;
		if(!("COLOR_ATTACHMENT28" in gl)) gl["COLOR_ATTACHMENT28"] = 0x8CFC;
		if(!("COLOR_ATTACHMENT29" in gl)) gl["COLOR_ATTACHMENT29"] = 0x8CFD;
		if(!("COLOR_ATTACHMENT30" in gl)) gl["COLOR_ATTACHMENT30"] = 0x8CFE;
		if(!("COLOR_ATTACHMENT31" in gl)) gl["COLOR_ATTACHMENT31"] = 0x8CFF;
		if(!("FRAMEBUFFER_INCOMPLETE_MULTISAMPLE" in gl)) gl["FRAMEBUFFER_INCOMPLETE_MULTISAMPLE"] = 0x8D56;
		if(!("MAX_SAMPLES" in gl)) gl["MAX_SAMPLES"] = 0x8D57;
		if(!("HALF_FLOAT" in gl)) gl["HALF_FLOAT"] = 0x140B;
		if(!("MAP_READ_BIT" in gl)) gl["MAP_READ_BIT"] = 0x0001;
		if(!("MAP_WRITE_BIT" in gl)) gl["MAP_WRITE_BIT"] = 0x0002;
		if(!("MAP_INVALIDATE_RANGE_BIT" in gl)) gl["MAP_INVALIDATE_RANGE_BIT"] = 0x0004;
		if(!("MAP_INVALIDATE_BUFFER_BIT" in gl)) gl["MAP_INVALIDATE_BUFFER_BIT"] = 0x0008;
		if(!("MAP_FLUSH_EXPLICIT_BIT" in gl)) gl["MAP_FLUSH_EXPLICIT_BIT"] = 0x0010;
		if(!("MAP_UNSYNCHRONIZED_BIT" in gl)) gl["MAP_UNSYNCHRONIZED_BIT"] = 0x0020;
		if(!("RG" in gl)) gl["RG"] = 0x8227;
		if(!("RG_INTEGER" in gl)) gl["RG_INTEGER"] = 0x8228;
		if(!("R8" in gl)) gl["R8"] = 0x8229;
		if(!("RG8" in gl)) gl["RG8"] = 0x822B;
		if(!("R16F" in gl)) gl["R16F"] = 0x822D;
		if(!("R32F" in gl)) gl["R32F"] = 0x822E;
		if(!("RG16F" in gl)) gl["RG16F"] = 0x822F;
		if(!("RG32F" in gl)) gl["RG32F"] = 0x8230;
		if(!("R8I" in gl)) gl["R8I"] = 0x8231;
		if(!("R8UI" in gl)) gl["R8UI"] = 0x8232;
		if(!("R16I" in gl)) gl["R16I"] = 0x8233;
		if(!("R16UI" in gl)) gl["R16UI"] = 0x8234;
		if(!("R32I" in gl)) gl["R32I"] = 0x8235;
		if(!("R32UI" in gl)) gl["R32UI"] = 0x8236;
		if(!("RG8I" in gl)) gl["RG8I"] = 0x8237;
		if(!("RG8UI" in gl)) gl["RG8UI"] = 0x8238;
		if(!("RG16I" in gl)) gl["RG16I"] = 0x8239;
		if(!("RG16UI" in gl)) gl["RG16UI"] = 0x823A;
		if(!("RG32I" in gl)) gl["RG32I"] = 0x823B;
		if(!("RG32UI" in gl)) gl["RG32UI"] = 0x823C;
		if(!("VERTEX_ARRAY_BINDING" in gl)) gl["VERTEX_ARRAY_BINDING"] = 0x85B5;
		if(!("R8_SNORM" in gl)) gl["R8_SNORM"] = 0x8F94;
		if(!("RG8_SNORM" in gl)) gl["RG8_SNORM"] = 0x8F95;
		if(!("RGB8_SNORM" in gl)) gl["RGB8_SNORM"] = 0x8F96;
		if(!("RGBA8_SNORM" in gl)) gl["RGBA8_SNORM"] = 0x8F97;
		if(!("SIGNED_NORMALIZED" in gl)) gl["SIGNED_NORMALIZED"] = 0x8F9C;
		if(!("PRIMITIVE_RESTART_FIXED_INDEX" in gl)) gl["PRIMITIVE_RESTART_FIXED_INDEX"] = 0x8D69;
		if(!("COPY_READ_BUFFER" in gl)) gl["COPY_READ_BUFFER"] = 0x8F36;
		if(!("COPY_WRITE_BUFFER" in gl)) gl["COPY_WRITE_BUFFER"] = 0x8F37;
		if(!("COPY_READ_BUFFER_BINDING" in gl)) gl["COPY_READ_BUFFER_BINDING"] = 0x8F36;
		if(!("COPY_WRITE_BUFFER_BINDING" in gl)) gl["COPY_WRITE_BUFFER_BINDING"] = 0x8F37;
		if(!("UNIFORM_BUFFER" in gl)) gl["UNIFORM_BUFFER"] = 0x8A11;
		if(!("UNIFORM_BUFFER_BINDING" in gl)) gl["UNIFORM_BUFFER_BINDING"] = 0x8A28;
		if(!("UNIFORM_BUFFER_START" in gl)) gl["UNIFORM_BUFFER_START"] = 0x8A29;
		if(!("UNIFORM_BUFFER_SIZE" in gl)) gl["UNIFORM_BUFFER_SIZE"] = 0x8A2A;
		if(!("MAX_VERTEX_UNIFORM_BLOCKS" in gl)) gl["MAX_VERTEX_UNIFORM_BLOCKS"] = 0x8A2B;
		if(!("MAX_FRAGMENT_UNIFORM_BLOCKS" in gl)) gl["MAX_FRAGMENT_UNIFORM_BLOCKS"] = 0x8A2D;
		if(!("MAX_COMBINED_UNIFORM_BLOCKS" in gl)) gl["MAX_COMBINED_UNIFORM_BLOCKS"] = 0x8A2E;
		if(!("MAX_UNIFORM_BUFFER_BINDINGS" in gl)) gl["MAX_UNIFORM_BUFFER_BINDINGS"] = 0x8A2F;
		if(!("MAX_UNIFORM_BLOCK_SIZE" in gl)) gl["MAX_UNIFORM_BLOCK_SIZE"] = 0x8A30;
		if(!("MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS" in gl)) gl["MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"] = 0x8A31;
		if(!("MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS" in gl)) gl["MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"] = 0x8A33;
		if(!("UNIFORM_BUFFER_OFFSET_ALIGNMENT" in gl)) gl["UNIFORM_BUFFER_OFFSET_ALIGNMENT"] = 0x8A34;
		if(!("ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH" in gl)) gl["ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH"] = 0x8A35;
		if(!("ACTIVE_UNIFORM_BLOCKS" in gl)) gl["ACTIVE_UNIFORM_BLOCKS"] = 0x8A36;
		if(!("UNIFORM_TYPE" in gl)) gl["UNIFORM_TYPE"] = 0x8A37;
		if(!("UNIFORM_SIZE" in gl)) gl["UNIFORM_SIZE"] = 0x8A38;
		if(!("UNIFORM_NAME_LENGTH" in gl)) gl["UNIFORM_NAME_LENGTH"] = 0x8A39;
		if(!("UNIFORM_BLOCK_INDEX" in gl)) gl["UNIFORM_BLOCK_INDEX"] = 0x8A3A;
		if(!("UNIFORM_OFFSET" in gl)) gl["UNIFORM_OFFSET"] = 0x8A3B;
		if(!("UNIFORM_ARRAY_STRIDE" in gl)) gl["UNIFORM_ARRAY_STRIDE"] = 0x8A3C;
		if(!("UNIFORM_MATRIX_STRIDE" in gl)) gl["UNIFORM_MATRIX_STRIDE"] = 0x8A3D;
		if(!("UNIFORM_IS_ROW_MAJOR" in gl)) gl["UNIFORM_IS_ROW_MAJOR"] = 0x8A3E;
		if(!("UNIFORM_BLOCK_BINDING" in gl)) gl["UNIFORM_BLOCK_BINDING"] = 0x8A3F;
		if(!("UNIFORM_BLOCK_DATA_SIZE" in gl)) gl["UNIFORM_BLOCK_DATA_SIZE"] = 0x8A40;
		if(!("UNIFORM_BLOCK_NAME_LENGTH" in gl)) gl["UNIFORM_BLOCK_NAME_LENGTH"] = 0x8A41;
		if(!("UNIFORM_BLOCK_ACTIVE_UNIFORMS" in gl)) gl["UNIFORM_BLOCK_ACTIVE_UNIFORMS"] = 0x8A42;
		if(!("UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES" in gl)) gl["UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"] = 0x8A43;
		if(!("UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER" in gl)) gl["UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"] = 0x8A44;
		if(!("UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER" in gl)) gl["UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"] = 0x8A46;
		if(!("INVALID_INDEX" in gl)) gl["INVALID_INDEX"] = 0xFFFFFFFF;
		if(!("MAX_VERTEX_OUTPUT_COMPONENTS" in gl)) gl["MAX_VERTEX_OUTPUT_COMPONENTS"] = 0x9122;
		if(!("MAX_FRAGMENT_INPUT_COMPONENTS" in gl)) gl["MAX_FRAGMENT_INPUT_COMPONENTS"] = 0x9125;
		if(!("MAX_SERVER_WAIT_TIMEOUT" in gl)) gl["MAX_SERVER_WAIT_TIMEOUT"] = 0x9111;
		if(!("OBJECT_TYPE" in gl)) gl["OBJECT_TYPE"] = 0x9112;
		if(!("SYNC_CONDITION" in gl)) gl["SYNC_CONDITION"] = 0x9113;
		if(!("SYNC_STATUS" in gl)) gl["SYNC_STATUS"] = 0x9114;
		if(!("SYNC_FLAGS" in gl)) gl["SYNC_FLAGS"] = 0x9115;
		if(!("SYNC_FENCE" in gl)) gl["SYNC_FENCE"] = 0x9116;
		if(!("SYNC_GPU_COMMANDS_COMPLETE" in gl)) gl["SYNC_GPU_COMMANDS_COMPLETE"] = 0x9117;
		if(!("UNSIGNALED" in gl)) gl["UNSIGNALED"] = 0x9118;
		if(!("SIGNALED" in gl)) gl["SIGNALED"] = 0x9119;
		if(!("ALREADY_SIGNALED" in gl)) gl["ALREADY_SIGNALED"] = 0x911A;
		if(!("TIMEOUT_EXPIRED" in gl)) gl["TIMEOUT_EXPIRED"] = 0x911B;
		if(!("CONDITION_SATISFIED" in gl)) gl["CONDITION_SATISFIED"] = 0x911C;
		if(!("WAIT_FAILED" in gl)) gl["WAIT_FAILED"] = 0x911D;
		if(!("SYNC_FLUSH_COMMANDS_BIT" in gl)) gl["SYNC_FLUSH_COMMANDS_BIT"] = 0x00000001;
		if(!("TIMEOUT_IGNORED" in gl)) gl["TIMEOUT_IGNORED"] = 0xFFFFFFFFFFFFFFFF;
		if(!("VERTEX_ATTRIB_ARRAY_DIVISOR" in gl)) gl["VERTEX_ATTRIB_ARRAY_DIVISOR"] = 0x88FE;
		if(!("ANY_SAMPLES_PASSED" in gl)) gl["ANY_SAMPLES_PASSED"] = 0x8C2F;
		if(!("ANY_SAMPLES_PASSED_CONSERVATIVE" in gl)) gl["ANY_SAMPLES_PASSED_CONSERVATIVE"] = 0x8D6A;
		if(!("SAMPLER_BINDING" in gl)) gl["SAMPLER_BINDING"] = 0x8919;
		if(!("RGB10_A2UI" in gl)) gl["RGB10_A2UI"] = 0x906F;
		if(!("TEXTURE_SWIZZLE_R" in gl)) gl["TEXTURE_SWIZZLE_R"] = 0x8E42;
		if(!("TEXTURE_SWIZZLE_G" in gl)) gl["TEXTURE_SWIZZLE_G"] = 0x8E43;
		if(!("TEXTURE_SWIZZLE_B" in gl)) gl["TEXTURE_SWIZZLE_B"] = 0x8E44;
		if(!("TEXTURE_SWIZZLE_A" in gl)) gl["TEXTURE_SWIZZLE_A"] = 0x8E45;
		if(!("GREEN" in gl)) gl["GREEN"] = 0x1904;
		if(!("BLUE" in gl)) gl["BLUE"] = 0x1905;
		if(!("INT_2_10_10_10_REV" in gl)) gl["INT_2_10_10_10_REV"] = 0x8D9F;
		if(!("TRANSFORM_FEEDBACK" in gl)) gl["TRANSFORM_FEEDBACK"] = 0x8E22;
		if(!("TRANSFORM_FEEDBACK_PAUSED" in gl)) gl["TRANSFORM_FEEDBACK_PAUSED"] = 0x8E23;
		if(!("TRANSFORM_FEEDBACK_ACTIVE" in gl)) gl["TRANSFORM_FEEDBACK_ACTIVE"] = 0x8E24;
		if(!("TRANSFORM_FEEDBACK_BINDING" in gl)) gl["TRANSFORM_FEEDBACK_BINDING"] = 0x8E25;
		if(!("PROGRAM_BINARY_RETRIEVABLE_HINT" in gl)) gl["PROGRAM_BINARY_RETRIEVABLE_HINT"] = 0x8257;
		if(!("PROGRAM_BINARY_LENGTH" in gl)) gl["PROGRAM_BINARY_LENGTH"] = 0x8741;
		if(!("NUM_PROGRAM_BINARY_FORMATS" in gl)) gl["NUM_PROGRAM_BINARY_FORMATS"] = 0x87FE;
		if(!("PROGRAM_BINARY_FORMATS" in gl)) gl["PROGRAM_BINARY_FORMATS"] = 0x87FF;
		if(!("COMPRESSED_R11_EAC" in gl)) gl["COMPRESSED_R11_EAC"] = 0x9270;
		if(!("COMPRESSED_SIGNED_R11_EAC" in gl)) gl["COMPRESSED_SIGNED_R11_EAC"] = 0x9271;
		if(!("COMPRESSED_RG11_EAC" in gl)) gl["COMPRESSED_RG11_EAC"] = 0x9272;
		if(!("COMPRESSED_SIGNED_RG11_EAC" in gl)) gl["COMPRESSED_SIGNED_RG11_EAC"] = 0x9273;
		if(!("COMPRESSED_RGB8_ETC2" in gl)) gl["COMPRESSED_RGB8_ETC2"] = 0x9274;
		if(!("COMPRESSED_SRGB8_ETC2" in gl)) gl["COMPRESSED_SRGB8_ETC2"] = 0x9275;
		if(!("COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2" in gl)) gl["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 0x9276;
		if(!("COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2" in gl)) gl["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 0x9277;
		if(!("COMPRESSED_RGBA8_ETC2_EAC" in gl)) gl["COMPRESSED_RGBA8_ETC2_EAC"] = 0x9278;
		if(!("COMPRESSED_SRGB8_ALPHA8_ETC2_EAC" in gl)) gl["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 0x9279;
		if(!("TEXTURE_IMMUTABLE_FORMAT" in gl)) gl["TEXTURE_IMMUTABLE_FORMAT"] = 0x912F;
		if(!("MAX_ELEMENT_INDEX" in gl)) gl["MAX_ELEMENT_INDEX"] = 0x8D6B;
		if(!("NUM_SAMPLE_COUNTS" in gl)) gl["NUM_SAMPLE_COUNTS"] = 0x9380;
		if(!("TEXTURE_IMMUTABLE_LEVELS" in gl)) gl["TEXTURE_IMMUTABLE_LEVELS"] = 0x82DF;
	}

	constructor(wasmContainer, GLContext)
	{
		var gl = GLContext;
		this.wasmContainer = wasmContainer;
		this.GLContext = gl;
		this.makeSureGLESConstants();
		this.webGLObjectIndex = 1;
		this.webGLObjectConversion = {0: null};
		this.webGLBufferBinding = {};
		this.webGLUniformLocationForPrograms = {};
		this.glGetTypes = {};
		this.glGetTypes[gl.ACTIVE_TEXTURE] = "GLenum";
		this.glGetTypes[gl.ALIASED_LINE_WIDTH_RANGE] = "GLfloat";
		this.glGetTypes[gl.ALIASED_POINT_SIZE_RANGE] = "GLfloat";
		this.glGetTypes[gl.ALPHA_BITS] = "GLint";
		this.glGetTypes[gl.BLEND] = "GLboolean";
		this.glGetTypes[gl.BLEND_COLOR] = "GLfloat";
		this.glGetTypes[gl.BLEND_DST_ALPHA] = "GLenum";
		this.glGetTypes[gl.BLEND_DST_RGB] = "GLenum";
		this.glGetTypes[gl.BLEND_EQUATION_ALPHA] = "GLenum";
		this.glGetTypes[gl.BLEND_EQUATION_RGB] = "GLenum";
		this.glGetTypes[gl.BLEND_SRC_ALPHA] = "GLenum";
		this.glGetTypes[gl.BLEND_SRC_RGB] = "GLenum";
		this.glGetTypes[gl.BLUE_BITS] = "GLint";
		this.glGetTypes[gl.COLOR_CLEAR_VALUE] = "GLfloat";
		this.glGetTypes[gl.COLOR_WRITEMASK] = "GLboolean";
		this.glGetTypes[gl.COMPRESSED_TEXTURE_FORMATS] = "Uint32Array";
		this.glGetTypes[gl.CULL_FACE] = "GLboolean";
		this.glGetTypes[gl.CULL_FACE_MODE] = "GLenum";
		this.glGetTypes[gl.DEPTH_BITS] = "GLint";
		this.glGetTypes[gl.DEPTH_CLEAR_VALUE] = "GLfloat";
		this.glGetTypes[gl.DEPTH_FUNC] = "GLenum";
		this.glGetTypes[gl.DEPTH_RANGE] = "GLfloat";
		this.glGetTypes[gl.DEPTH_TEST] = "GLboolean";
		this.glGetTypes[gl.DEPTH_WRITEMASK] = "GLboolean";
		this.glGetTypes[gl.DITHER] = "GLboolean";
		this.glGetTypes[gl.FRONT_FACE] = "GLenum";
		this.glGetTypes[gl.GENERATE_MIPMAP_HINT] = "GLenum";
		this.glGetTypes[gl.GREEN_BITS] = "GLint";
		this.glGetTypes[gl.IMPLEMENTATION_COLOR_READ_FORMAT] = "GLenum";
		this.glGetTypes[gl.IMPLEMENTATION_COLOR_READ_TYPE] = "GLenum";
		this.glGetTypes[gl.LINE_WIDTH] = "GLfloat";
		this.glGetTypes[gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS] = "GLint";
		this.glGetTypes[gl.MAX_CUBE_MAP_TEXTURE_SIZE] = "GLint";
		this.glGetTypes[gl.MAX_FRAGMENT_UNIFORM_VECTORS] = "GLint";
		this.glGetTypes[gl.MAX_RENDERBUFFER_SIZE] = "GLint";
		this.glGetTypes[gl.MAX_TEXTURE_IMAGE_UNITS] = "GLint";
		this.glGetTypes[gl.MAX_TEXTURE_SIZE] = "GLint";
		this.glGetTypes[gl.MAX_VARYING_VECTORS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_ATTRIBS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_UNIFORM_VECTORS] = "GLint";
		this.glGetTypes[gl.MAX_VIEWPORT_DIMS] = "GLint";
		this.glGetTypes[gl.PACK_ALIGNMENT] = "GLint";
		this.glGetTypes[gl.POLYGON_OFFSET_FACTOR] = "GLfloat";
		this.glGetTypes[gl.POLYGON_OFFSET_FILL] = "GLboolean";
		this.glGetTypes[gl.POLYGON_OFFSET_UNITS] = "GLfloat";
		this.glGetTypes[gl.RED_BITS] = "GLint";
		this.glGetTypes[gl.RENDERER] = "DOMString";
		this.glGetTypes[gl.SAMPLE_ALPHA_TO_COVERAGE] = "GLboolean";
		this.glGetTypes[gl.SAMPLE_BUFFERS] = "GLint";
		this.glGetTypes[gl.SAMPLE_COVERAGE] = "GLboolean";
		this.glGetTypes[gl.SAMPLE_COVERAGE_INVERT] = "GLboolean";
		this.glGetTypes[gl.SAMPLE_COVERAGE_VALUE] = "GLfloat";
		this.glGetTypes[gl.SAMPLES] = "GLint";
		this.glGetTypes[gl.SCISSOR_BOX] = "GLint";
		this.glGetTypes[gl.SCISSOR_TEST] = "GLboolean";
		this.glGetTypes[gl.SHADING_LANGUAGE_VERSION] = "DOMString";
		this.glGetTypes[gl.STENCIL_BACK_FAIL] = "GLenum";
		this.glGetTypes[gl.STENCIL_BACK_FUNC] = "GLenum";
		this.glGetTypes[gl.STENCIL_BACK_PASS_DEPTH_FAIL] = "GLenum";
		this.glGetTypes[gl.STENCIL_BACK_PASS_DEPTH_PASS] = "GLenum";
		this.glGetTypes[gl.STENCIL_BACK_REF] = "GLint";
		this.glGetTypes[gl.STENCIL_BACK_VALUE_MASK] = "GLuint";
		this.glGetTypes[gl.STENCIL_BACK_WRITEMASK] = "GLuint";
		this.glGetTypes[gl.STENCIL_BITS] = "GLint";
		this.glGetTypes[gl.STENCIL_CLEAR_VALUE] = "GLint";
		this.glGetTypes[gl.STENCIL_FAIL] = "GLenum";
		this.glGetTypes[gl.STENCIL_FUNC] = "GLenum";
		this.glGetTypes[gl.STENCIL_PASS_DEPTH_FAIL] = "GLenum";
		this.glGetTypes[gl.STENCIL_PASS_DEPTH_PASS] = "GLenum";
		this.glGetTypes[gl.STENCIL_REF] = "GLint";
		this.glGetTypes[gl.STENCIL_TEST] = "GLboolean";
		this.glGetTypes[gl.STENCIL_VALUE_MASK] = "GLuint";
		this.glGetTypes[gl.STENCIL_WRITEMASK] = "GLuint";
		this.glGetTypes[gl.SUBPIXEL_BITS] = "GLint";
		this.glGetTypes[gl.UNPACK_ALIGNMENT] = "GLint";
		this.glGetTypes[gl.UNPACK_COLORSPACE_CONVERSION_WEBGL] = "GLenum";
		this.glGetTypes[gl.UNPACK_FLIP_Y_WEBGL] = "GLboolean";
		this.glGetTypes[gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL] = "GLboolean";
		this.glGetTypes[gl.VENDOR] = "DOMString";
		this.glGetTypes[gl.VERSION] = "DOMString";
		this.glGetTypes[gl.VIEWPORT] = "GLint";

		this.glGetTypes[gl.DRAW_BUFFER0] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER1] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER2] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER3] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER4] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER5] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER6] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER7] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER8] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER9] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER10] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER11] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER12] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER13] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER14] = "GLenum";
		this.glGetTypes[gl.DRAW_BUFFER15] = "GLenum";
		this.glGetTypes[gl.FRAGMENT_SHADER_DERIVATIVE_HINT] = "GLenum";
		this.glGetTypes[gl.MAX_3D_TEXTURE_SIZE] = "GLint";
		this.glGetTypes[gl.MAX_ARRAY_TEXTURE_LAYERS] = "GLint";
		this.glGetTypes[gl.MAX_CLIENT_WAIT_TIMEOUT_WEBGL] = "GLint64";
		this.glGetTypes[gl.MAX_COLOR_ATTACHMENTS] = "GLint";
		this.glGetTypes[gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS] = "GLint64";
		this.glGetTypes[gl.MAX_COMBINED_UNIFORM_BLOCKS] = "GLint";
		this.glGetTypes[gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS] = "GLint64";
		this.glGetTypes[gl.MAX_DRAW_BUFFERS] = "GLint";
		this.glGetTypes[gl.MAX_ELEMENT_INDEX] = "GLint64";
		this.glGetTypes[gl.MAX_ELEMENTS_INDICES] = "GLint";
		this.glGetTypes[gl.MAX_ELEMENTS_VERTICES] = "GLint";
		this.glGetTypes[gl.MAX_FRAGMENT_INPUT_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_FRAGMENT_UNIFORM_BLOCKS] = "GLint";
		this.glGetTypes[gl.MAX_FRAGMENT_UNIFORM_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_PROGRAM_TEXEL_OFFSET] = "GLint";
		this.glGetTypes[gl.MAX_SAMPLES] = "GLint";
		this.glGetTypes[gl.MAX_SERVER_WAIT_TIMEOUT] = "GLint64";
		this.glGetTypes[gl.MAX_TEXTURE_LOD_BIAS] = "GLfloat";
		this.glGetTypes[gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS] = "GLint";
		this.glGetTypes[gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_UNIFORM_BLOCK_SIZE] = "GLint64";
		this.glGetTypes[gl.MAX_UNIFORM_BUFFER_BINDINGS] = "GLint";
		this.glGetTypes[gl.MAX_VARYING_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_OUTPUT_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_UNIFORM_BLOCKS] = "GLint";
		this.glGetTypes[gl.MAX_VERTEX_UNIFORM_COMPONENTS] = "GLint";
		this.glGetTypes[gl.MIN_PROGRAM_TEXEL_OFFSET] = "GLint";
		this.glGetTypes[gl.PACK_ROW_LENGTH] = "GLint";
		this.glGetTypes[gl.PACK_SKIP_PIXELS] = "GLint";
		this.glGetTypes[gl.PACK_SKIP_ROWS] = "GLint";
		this.glGetTypes[gl.RASTERIZER_DISCARD] = "GLboolean";
		this.glGetTypes[gl.READ_BUFFER] = "GLenum";
		this.glGetTypes[gl.TRANSFORM_FEEDBACK_ACTIVE] = "GLboolean";
		this.glGetTypes[gl.TRANSFORM_FEEDBACK_PAUSED] = "GLboolean";
		this.glGetTypes[gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT] = "GLint";
		this.glGetTypes[gl.UNPACK_IMAGE_HEIGHT] = "GLint";
		this.glGetTypes[gl.UNPACK_ROW_LENGTH] = "GLint";
		this.glGetTypes[gl.UNPACK_SKIP_IMAGES] = "GLint";
		this.glGetTypes[gl.UNPACK_SKIP_PIXELS] = "GLint";
		this.glGetTypes[gl.UNPACK_SKIP_ROWS] = "GLint";

		this.glGetObjects = {};
		this.glGetObjects[gl.ARRAY_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.CURRENT_PROGRAM] = "WebGLProgram";
		this.glGetObjects[gl.ELEMENT_ARRAY_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.FRAMEBUFFER_BINDING] = "WebGLFramebuffer";
		this.glGetObjects[gl.RENDERBUFFER_BINDING] = "WebGLRenderbuffer";
		this.glGetObjects[gl.TEXTURE_BINDING_2D] = "WebGLTexture";
		this.glGetObjects[gl.TEXTURE_BINDING_CUBE_MAP] = "WebGLTexture";

		this.glGetObjects[gl.COPY_READ_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.COPY_WRITE_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.DRAW_FRAMEBUFFER_BINDING] = "WebGLFramebuffer";
		this.glGetObjects[gl.PIXEL_PACK_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.PIXEL_UNPACK_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.READ_FRAMEBUFFER_BINDING] = "WebGLFramebuffer";
		this.glGetObjects[gl.SAMPLER_BINDING] = "WebGLSampler";
		this.glGetObjects[gl.TEXTURE_BINDING_2D_ARRAY] = "WebGLTexture";
		this.glGetObjects[gl.TEXTURE_BINDING_3D] = "WebGLTexture";
		this.glGetObjects[gl.TRANSFORM_FEEDBACK_BINDING] = "WebGLTransformFeedback";
		this.glGetObjects[gl.TRANSFORM_FEEDBACK_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.UNIFORM_BUFFER_BINDING] = "WebGLBuffer";
		this.glGetObjects[gl.VERTEX_ARRAY_BINDING] = "WebGLVertexArrayObject";

		this.glGetArraySizes = {};
		this.glGetArraySizes[gl.ALIASED_LINE_WIDTH_RANGE] = 2;
		this.glGetArraySizes[gl.ALIASED_POINT_SIZE_RANGE] = 2;
		this.glGetArraySizes[gl.BLEND_COLOR] = 4;
		this.glGetArraySizes[gl.COLOR_CLEAR_VALUE] = 4;
		this.glGetArraySizes[gl.COLOR_WRITEMASK] = 4;
		this.glGetArraySizes[gl.DEPTH_RANGE] = 2;
		this.glGetArraySizes[gl.MAX_VIEWPORT_DIMS] = 2;
		this.glGetArraySizes[gl.SCISSOR_BOX] = 4;
		this.glGetArraySizes[gl.VIEWPORT] = 4;

		this.glActiveTypes =
		[
			gl.FLOAT, gl.FLOAT_VEC2, gl.FLOAT_VEC3, gl.FLOAT_VEC4,
			gl.INT, gl.INT_VEC2, gl.INT_VEC3, gl.INT_VEC4,
			gl.BOOL, gl.BOOL_VEC2, gl.BOOL_VEC3, gl.BOOL_VEC4,
			gl.FLOAT_MAT2, gl.FLOAT_MAT3, gl.FLOAT_MAT4,
			gl.SAMPLER_2D, gl.SAMPLER_CUBE,
			gl.UNSIGNED_INT, gl.UNSIGNED_INT_VEC2, gl.UNSIGNED_INT_VEC3, gl.UNSIGNED_INT_VEC4,
			gl.FLOAT_MAT2x3, gl.FLOAT_MAT2x4, gl.FLOAT_MAT3x2, gl.FLOAT_MAT3x4, gl.FLOAT_MAT4x2, gl.FLOAT_MAT4x3,
			gl.SAMPLER_3D, gl.SAMPLER_2D_SHADOW, gl.SAMPLER_2D_ARRAY, gl.SAMPLER_2D_ARRAY_SHADOW, gl.SAMPLER_CUBE_SHADOW,
			gl.INT_SAMPLER_2D, gl.INT_SAMPLER_3D, gl.INT_SAMPLER_CUBE, gl.INT_SAMPLER_2D_ARRAY, gl.UNSIGNED_INT_SAMPLER_2D, gl.UNSIGNED_INT_SAMPLER_3D, gl.UNSIGNED_INT_SAMPLER_CUBE, gl.UNSIGNED_INT_SAMPLER_2D_ARRAY
		];

		this.typeSizes = {};
		this.typeSizes[gl.FLOAT] = 1;
		this.typeSizes[gl.FLOAT_VEC2] = 2;
		this.typeSizes[gl.FLOAT_VEC3] = 3;
		this.typeSizes[gl.FLOAT_VEC4] = 4;
		this.typeSizes[gl.INT] = 1;
		this.typeSizes[gl.INT_VEC2] = 2;
		this.typeSizes[gl.INT_VEC3] = 3;
		this.typeSizes[gl.INT_VEC4] = 4;
		this.typeSizes[gl.BOOL] = 1;
		this.typeSizes[gl.BOOL_VEC2] = 2;
		this.typeSizes[gl.BOOL_VEC3] = 3;
		this.typeSizes[gl.BOOL_VEC4] = 4;
		this.typeSizes[gl.FLOAT_MAT2] = 4;
		this.typeSizes[gl.FLOAT_MAT3] = 9;
		this.typeSizes[gl.FLOAT_MAT4] = 16;
		this.typeSizes[gl.SAMPLER_2D] = 1;
		this.typeSizes[gl.SAMPLER_CUBE] = 1;
		this.typeSizes[gl.UNSIGNED_INT] = 1;
		this.typeSizes[gl.UNSIGNED_INT_VEC2] = 2;
		this.typeSizes[gl.UNSIGNED_INT_VEC3] = 3;
		this.typeSizes[gl.UNSIGNED_INT_VEC4] = 4;
		this.typeSizes[gl.FLOAT_MAT2x3] = 6;
		this.typeSizes[gl.FLOAT_MAT2x4] = 8;
		this.typeSizes[gl.FLOAT_MAT3x2] = 6;
		this.typeSizes[gl.FLOAT_MAT3x4] = 12;
		this.typeSizes[gl.FLOAT_MAT4x2] = 8;
		this.typeSizes[gl.FLOAT_MAT4x3] = 12;
		this.typeSizes[gl.SAMPLER_3D] = 1;
		this.typeSizes[gl.SAMPLER_2D_SHADOW] = 1;
		this.typeSizes[gl.SAMPLER_2D_ARRAY] = 1;
		this.typeSizes[gl.SAMPLER_2D_ARRAY_SHADOW] = 1;
		this.typeSizes[gl.SAMPLER_CUBE_SHADOW] = 1;
		this.typeSizes[gl.INT_SAMPLER_2D] = 1;
		this.typeSizes[gl.INT_SAMPLER_3D] = 1;
		this.typeSizes[gl.INT_SAMPLER_CUBE] = 1;
		this.typeSizes[gl.INT_SAMPLER_2D_ARRAY] = 1;
		this.typeSizes[gl.UNSIGNED_INT_SAMPLER_2D] = 1;
		this.typeSizes[gl.UNSIGNED_INT_SAMPLER_3D] = 1;
		this.typeSizes[gl.UNSIGNED_INT_SAMPLER_CUBE] = 1;
		this.typeSizes[gl.UNSIGNED_INT_SAMPLER_2D_ARRAY] = 1;

		this.pixelStoreiState = {};
		this.pixelStoreiState[gl.PACK_ROW_LENGTH] = 0;
		this.pixelStoreiState[gl.PACK_SKIP_PIXELS] = 0;
		this.pixelStoreiState[gl.PACK_SKIP_ROWS] = 0;
		this.pixelStoreiState[gl.PACK_ALIGNMENT] = 0;
		this.pixelStoreiState[gl.UNPACK_ROW_LENGTH] = 0;
		this.pixelStoreiState[gl.UNPACK_IMAGE_HEIGHT] = 0;
		this.pixelStoreiState[gl.UNPACK_SKIP_PIXELS] = 0;
		this.pixelStoreiState[gl.UNPACK_SKIP_ROWS] = 0;
		this.pixelStoreiState[gl.UNPACK_SKIP_IMAGES] = 0;
		this.pixelStoreiState[gl.UNPACK_ALIGNMENT] = 0;

		this.currentProgram = null;

		this.mappedBuffers = {};

		this.pointerOfAllExtensionString = 0;
		this.pointerOfExtensionStrings = [];
		this.pointerOfVendorString = 0;
		this.pointerOfVersionString = 0;
		this.pointerOfShadingLanguageString = 0;

		gl["ACTIVE_ATTRIBUTE_MAX_LENGTH"] = 0x8B8A;
		gl["ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH"] = 0x8A35;
		gl["ACTIVE_UNIFORM_MAX_LENGTH"] = 0x8B87;
		gl["INFO_LOG_LENGTH"] = 0x8B84;
		gl["PROGRAM_BINARY_RETRIEVABLE_HINT"] = 0x8257;
		gl["TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH"] = 0x8C76;
	}

	static allocateIndexForWebGLObject(w4winst, WebGLObject)
	{
		var conv = w4winst.webGLObjectConversion;
		var keys = Object.keys(conv);
		var index = w4winst.webGLObjectIndex;
		if (!index) index = 1;
		while (index != 0)
		{
			if (!(index in conv))
			{
				conv[index] = WebGLObject;
				w4winst.webGLObjectIndex = index;
				return index;
			}
			index ++;
		}
		return 0; // For fail
	}

	static getIndexByWebGLObject(w4winst, WebGLObject)
	{
		var conv = w4winst.webGLObjectConversion;
		return Object.keys(conv).find(index => conv[index] === WebGLObject);
	}

	static freeIndexForWebGLObject(w4winst, index) // Be sure the object is deleted, then call to w4winst.function.
	{
		var conv = w4winst.webGLObjectConversion;
		if (delete conv[index])
		{
			if (index < w4winst.webGLObjectIndex) w4winst.webGLObjectIndex = index;
			return true;
		}
		return false;
	}

	static allocateIndexForUniformLocation(w4winst, WebGLProgram, name, WebGLUniformLocation)
	{
		var returnIndex;
		var locationInfo =
		{
			locationIndex: 0,
			locations : {}
		};
		if (WebGLProgram in w4winst.webGLUniformLocationForPrograms)
			locationInfo = w4winst.webGLUniformLocationForPrograms[WebGLProgram];

		if (WebGLUniformLocation == null)
		{
			locationInfo.locations[name] =
			{
				index: -1,
				locationObject: null
			};
			returnIndex = -1;
		}
		else
		{
			locationInfo.locations[name] =
			{
				index: locationInfo.locationIndex,
				locationObject: WebGLUniformLocation
			};
			returnIndex = locationInfo.locationIndex;
			locationInfo.locationIndex ++;
		}

		w4winst.webGLUniformLocationForPrograms[WebGLProgram] = locationInfo;
		return returnIndex;
	}

	static getLocationObjectByIndex(w4winst, WebGLProgram, locationIndex)
	{
		if (WebGLProgram in w4winst.webGLUniformLocationForPrograms)
		{
			var locationInfo = w4winst.webGLUniformLocationForPrograms[WebGLProgram];
			for(name in Object.keys(locationInfo.locations))
			{
				var cur = locationInfo.locations[name];
				if (cur.index == locationIndex)
					return cur.locationObject;
			}
			return null;
		}
		else
		{
			return null;
		}
	}

	static getLocationObjectByName(w4winst, WebGLProgram, locationName)
	{
		if (WebGLProgram in w4winst.webGLUniformLocationForPrograms)
		{
			var locationInfo = w4winst.webGLUniformLocationForPrograms[WebGLProgram];
			if (locationName in locationInfo.locations)
				return locationInfo.locations[locationName].locationObject;
			else
				return null;
		}
		else
		{
			return null;
		}
	}

	static getLocationNameByLocationObject(w4winst, WebGLProgram, locationObject)
	{
		if (WebGLProgram in w4winst.webGLUniformLocationForPrograms)
		{
			var locationInfo = w4winst.webGLUniformLocationForPrograms[WebGLProgram];
			return Object.keys(locationInfo.locations).find(name => locationInfo.locations[name].locationObject === locationObject);
		}
		else
		{
			return null;
		}
	}

	static getLocationNameByLocationIndex(w4winst, WebGLProgram, locationIndex)
	{
		if (WebGLProgram in w4winst.webGLUniformLocationForPrograms)
		{
			var locationInfo = w4winst.webGLUniformLocationForPrograms[WebGLProgram];
			return Object.keys(locationInfo.locations).find(name => locationInfo.locations[name].locationIndex == locationIndex);
		}
		else
		{
			return null;
		}
	}

	static getSizeOfActiveType(w4winst, activeType)
	{
		return w4winst.typeSizes[activeType];
	}

	static isValidAccepts(accepts)
	{
		return accepts.indexOf(undefined) == -1;
	}

	initGLGetStrings()
	{
		var gl = this.GLContext;
		var wc = this.wasmContainer;
		var extensions = ["GL_ES_VERSION_2_0", "GL_ES_VERSION_3_0"];
		var extensionString = extensions.join(" ");
		var vendorString = "WebGL_Wrapper";
		var versionString = "3.0.0 ES WebGL_Wrapper 1.0";
		var shadingLanguageVersionString = "3.00 ES";
		var stringPool = extensions;
		stringPool.push(extensionString);
		stringPool.push(vendorString);
		stringPool.push(versionString);
		stringPool.push(shadingLanguageVersionString);
		var stringPoolString = stringPool.join("\0");
		var stringPoolPointer = wc.allocateMemory(stringPoolString.length + 1);
		wc.writeString(stringPoolPointer, stringPoolString.length + 1, stringPoolString);
		var curPtr = stringPoolPointer;
		for(var i in extensions)
		{
			var extName = extensions[i];
			this.pointerOfExtensionStrings.push(curPtr);
			curPtr += extName.length + 1;
		}
		this.pointerOfAllExtensionString = curPtr;
		curPtr += extensionString.length + 1;
		this.pointerOfVendorString = curPtr;
		curPtr += vendorString.length + 1;
		this.pointerOfVersionString = curPtr;
		curPtr += versionString.length + 1;
		this.pointerOfShadingLanguageString = curPtr;
		curPtr += shadingLanguageVersionString.length + 1;
	}

	importOpenGLES3()
	{
		var owner = this;
		var gl = this.GLContext;
		var wc = this.wasmContainer;
		var conv = this.webGLObjectConversion;
		var bufferBinding = this.webGLBufferBinding;
		wc.addOnLoadedFunction(() => owner.initGLGetStrings());
		wc.importFunction("glActiveTexture", texture => gl.activeTexture(texture));
		wc.importFunction("glAttachShader", (program, shader) => gl.attachShader(conv[program], conv[shader]));
		wc.importFunction("glBindAttribLocation", (program, index, name) => gl.bindAttribLocation(conv[program], index, wc.getString(name)));
		wc.importFunction("glBindBuffer", function(target, buffer)
		{
			if (buffer)
			{
				var obj = conv[buffer];
				bufferBinding[target] = obj;
				gl.bindBuffer(target, obj);
			}
			else
			{
				delete bufferBinding[target];
				gl.bindBuffer(target, null);
			}
		});
		wc.importFunction("glBindFramebuffer", (target, framebuffer) => gl.bindFramebuffer(target, conv[framebuffer]));
		wc.importFunction("glBindRenderbuffer", (target, renderbuffer) => gl.bindRenderbuffer(target, conv[renderbuffer]));
		wc.importFunction("glBindTexture", (target, texture) => gl.bindTexture(target, conv[texture]));
		wc.importFunction("glBlendColor", (red, buffer, blue, alpha) => gl.blendColor(red, buffer, blue, alpha));
		wc.importFunction("glBlendEquation", (mode) => gl.blendEquation(mode));
		wc.importFunction("glBlendEquationSeparate", (modeRGB, modeAlpha) => gl.blendEquationSeparate(modeRGB, modeAlpha));
		wc.importFunction("glBlendFunc", (sfactor, dfactor) => gl.blendFunc(sfactor, dfactor));
		wc.importFunction("glBlendFuncSeparate", (sfactorRGB, dfactorRGB, sfactorAlpha, dfactorAlpha) => gl.blendFuncSeparate(sfactorRGB, dfactorRGB, sfactorAlpha, dfactorAlpha));
		wc.importFunction("glBufferData", function(target, size, data, usage)
		{
			if (data && size) gl.bufferData(target, wc.getMemory(data, size), usage);
			else gl.bufferData(target, size, usage);
		});
		wc.importFunction("glBufferSubData", (target, offset, size, data) => gl.bufferSubData(target, offset, wc.getMemory(data, size)));
		wc.importFunction("glCheckFramebufferStatus", function(target){return gl.checkFramebufferStatus(target)});
		wc.importFunction("glClear", (mask) => gl.clear(mask));
		wc.importFunction("glClearColor", (red, green, blue, alpha) => gl.clearColor(red, green, blue, alpha));
		wc.importFunction("glClearDepthf", (d) => gl.clearDepth(d));
		wc.importFunction("glClearStencil", (s) => gl.clearStencil(s));
		wc.importFunction("glColorMask", (red, green, blue, alpha) => gl.colorMask(red, green, blue, alpha));
		wc.importFunction("glCompileShader", (shader) => gl.compileShader(conv[shader]));
		wc.importFunction("glCompressedTexImage2D", (target, level, internalformat, width, height, border, imageSize, data) => gl.compressedTexImage2D(target, level, internalformat, width, height, border, wc.getMemoryBytes(data, imageSize)));
		wc.importFunction("glCompressedTexSubImage2D", (target, level, xoffset, yoffset, width, height, format, imageSize, data) => gl.compressedTexImage2D(target, level, xoffset, yoffset, width, height, format, wc.getMemoryBytes(data, imageSize)));
		wc.importFunction("glCopyTexImage2D", (target, level, internalformat, x, y, width, height, border) => gl.copyTexImage2D(target, level, internalformat, x, y, width, height, border));
		wc.importFunction("glCopyTexSubImage2D", (target, level, xoffset, yoffset, x, y, width, height) => gl.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height));
		wc.importFunction("glCreateProgram", function(){ return WebGL4WASM.allocateIndexForWebGLObject(owner, gl.createProgram()); });
		wc.importFunction("glCreateShader", function(type){ return WebGL4WASM.allocateIndexForWebGLObject(owner, gl.createShader(type)); });
		wc.importFunction("glCullFace", (mode) => gl.cullFace(mode));
		var glDeleteXYZ = function(n, array, delXYZ_callable)
		{
			console.assert(n && array);
			var indices = wc.getMemoryPointer(array, n);
			for(var i in indices)
			{
				var index = indices[i];
				if (index in conv)
				{
					delXYZ_callable(conv[index]);
					WebGL4WASM.freeIndexForWebGLObject(owner, index);
				}
			}
		}
		wc.importFunction("glDeleteBuffers", (n, buffers) => glDeleteXYZ(n, buffers, obj => gl.deleteBuffer(obj)));
		wc.importFunction("glDeleteFramebuffers", (n, framebuffers) => glDeleteXYZ(n, framebuffers, obj => gl.deleteFramebuffer(obj)));
		var glDeleteX = function(x, delX_callable)
		{
			if (x in conv)
			{
				var obj = conv[x];
				delX_callable(obj);
				WebGL4WASM.freeIndexForWebGLObject(owner, x);
			}
		}
		wc.importFunction("glDeleteProgram", function(program)
		{
			if (program in conv) delete owner.webGLUniformLocationForPrograms[conv[program]];
			glDeleteX(program, obj => gl.deleteProgram(obj));
		});
		wc.importFunction("glDeleteRenderbuffers", (n, renderbuffers) => glDeleteXYZ(n, renderbuffers, obj => gl.deleteRenderbuffer(obj)));
		wc.importFunction("glDeleteShader", shader => glDeleteX(shader, obj => gl.deleteShader(obj)));
		wc.importFunction("glDeleteTextures", (n, textures) => glDeleteXYZ(n, textures, obj => gl.deleteTexture(obj)));
		wc.importFunction("glDepthFunc", (func) => gl.depthFunc(func));
		wc.importFunction("glDepthMask", (flag) => gl.depthMask(flag));
		wc.importFunction("glDepthRangef", (n, f) => gl.depthRange(n, f));
		wc.importFunction("glDetachShader", (program, shader) => gl.detachShader(conv[program], conv[shader]));
		wc.importFunction("glDisable", (cap) => gl.disable(cap));
		wc.importFunction("glDisableVertexAttribArray", (index) => gl.disableVertexAttribArray(index));
		wc.importFunction("glDrawArrays", (mode, first, count) => gl.drawArrays(mode, first, count));
		wc.importFunction("glDrawElements", function(mode, count, type, indices)
		{
			if (gl.ELEMENT_ARRAY_BUFFER in bufferBinding && bufferBinding[gl.ELEMENT_ARRAY_BUFFER] != null)
			{
				gl.drawElements(mode, count, type, indices);
			}
			else
			{
				console.assert(indices);
				var size = count;
				switch(type)
				{
				case gl.UNSIGNED_BYTE: break;
				case gl.UNSIGNED_SHORT: size *= 2; break;
				case gl.UNSIGNED_INT: size *= 4; break;
				default: return;
				}
				var elementArrayBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wc.getMemory(indices, size), gl.STATIC_DRAW);
				gl.drawElements(mode, count, type, 0);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
				gl.deleteBuffer(elementArrayBuffer);
			}
		});
		wc.importFunction("glEnable", (cap) => gl.enable(cap));
		wc.importFunction("glEnableVertexAttribArray", (index) => gl.enableVertexAttribArray(index));
		wc.importFunction("glFinish", () => gl.finish(index));
		wc.importFunction("glFlush", () => gl.flush(index));
		wc.importFunction("glFramebufferRenderbuffer", (target, attachment, renderbuffertarget, renderbuffer) => gl.framebufferRenderbuffer(target, attachment, renderbuffertarget, conv[renderbuffer]));
		wc.importFunction("glFramebufferTexture2D", (target, attachment, textarget, texture, level) => gl.framebufferTexture2D(target, attachment, textarget, conv[texture], level));
		wc.importFunction("glFrontFace", (mode) => gl.frontFace(mode));
		var glGenXYZ = function(n, array, genXYZ_callable)
		{
			console.assert(n && array);
			var indices = new Uint32Array(n);
			for(var i = 0; i < n; i++)
			{
				indices[i] = WebGL4WASM.allocateIndexForWebGLObject(owner, genXYZ_callable());
			}
			wc.writeMemory(array, indices);
		};
		wc.importFunction("glGenBuffers", (n, buffers) => glGenXYZ(n, buffers, function(){ return gl.createBuffer();}));
		wc.importFunction("glGenerateMipmap", (target) => gl.generateMipmap(target));
		wc.importFunction("glGenFramebuffers", (n, framebuffers) => glGenXYZ(n, framebuffers, function(){ return gl.createFramebuffer();}));
		wc.importFunction("glGenRenderbuffers", (n, renderbuffers) => glGenXYZ(n, renderbuffers, function(){ return gl.createRenderbuffer();}));
		wc.importFunction("glGenTextures", (n, textures) => glGenXYZ(n, renderbuffers, function(){ return gl.createTexture();}));
		wc.importFunction("glGetActiveAttrib", function(program, index, bufSize, length, size, type, name)
		{
			var activeInfo = gl.getActiveAttrib(conv[program], index);
			if (activeInfo != null)
			{
				if (bufSize && name)
				{
					var wrotelen = wc.writeString(name, bufSize, activeInfo.name);
					if (length) wc.writeMemoryInt32(length, wrotelen);
				}
				if (size) wc.writeMemoryInt32(size, activeInfo.size);
				if (type) wc.writeMemoryUint32(type, activeInfo.type);
			}
			else
			{
				if (bufSize && name)
				{
					wc.writeMemoryUint8(name, 0);
					if (length) wc.writeMemoryInt32(length, 0);
				}
			}
		});
		wc.importFunction("glGetActiveUniform", function(program, index, bufSize, length, size, type, name)
		{
			var activeInfo = gl.getActiveUniform(conv[program], index);
			if (activeInfo != null)
			{
				if (bufSize && name)
				{
					var wrotelen = wc.writeString(name, bufSize, activeInfo.name);
					if (length) wc.writeMemoryInt32(length, wrotelen);
				}
				if (size) wc.writeMemoryInt32(size, activeInfo.size);
				if (type) wc.writeMemoryUint32(type, activeInfo.type);
			}
			else
			{
				if (bufSize && name)
				{
					wc.writeMemoryUint8(name, 0);
					if (length) wc.writeMemoryInt32(length, 0);
				}
			}
		});
		wc.importFunction("glGetAttachedShaders", function(program, maxCount, count, shaders)
		{
			var got_shaders = gl.getAttachedShaders(conv[program]);
			if (count) wc.writeMemoryInt32(count, got_shaders.length);
			if (maxCount > got_shaders.length) maxCount = got_shaders.length;
			for(var i = 0; i < maxCount; i++)
			{
				wc.writeMemoryInt32(shaders + i * 4, WebGL4WASM.getIndexByWebGLObject(owner, got_shaders[i]));
			}
		});
		wc.importFunction("glGetAttribLocation", function(program, name){ return gl.getAttribLocation(conv[program], wc.getString(name)); });
		wc.importFunction("glGetBooleanv", function(pname, data)
		{
			console.assert(pname in owner.glGetTypes);
			var got = gl.getParameter(pname);
			if (pname in owner.glGetArraySizes)
			{
				var count = owner.glGetArraySizes[pname];
				for(var i = 0; i < count; i++)
				{
					wc.writeMemoryUint8(data + i, got[i]);
				}
			}
			else
			{
				wc.writeMemoryUint8(data, got);
			}
		});
		wc.importFunction("glGetBufferParameteriv", function(target, pname, params)
		{
			var accepts = [gl.BUFFER_SIZE, gl.BUFFER_USAGE];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getBufferParameter(target, pname);
			switch(pname)
			{
			case gl.BUFFER_SIZE: wc.writeMemoryInt32(params, got); break;
			case gl.BUFFER_USAGE: wc.writeMemoryUint32(params, got); break;
			}
		});
		wc.importFunction("glGetError", function(){ return gl.getError(); });
		wc.importFunction("glGetFloatv", function(pname, data)
		{
			console.assert(pname in owner.glGetTypes || pname in owner.glGetObjects);
			var wrapper = function(g) {return g;}
			if (pname in owner.glGetObjects) wrapper = function(g) {return WebGL4WASM.getIndexByWebGLObject(owner, g);}
			var got = gl.getParameter(pname);
			if (pname in owner.glGetArraySizes)
			{
				var count = owner.glGetArraySizes[pname];
				for(var i = 0; i < count; i++)
				{
					wc.writeMemoryFloat32(data + i, wrapper(got[i]));
				}
			}
			else
			{
				wc.writeMemoryFloat32(data, wrapper(got));
			}
		});
		wc.importFunction("glGetFramebufferAttachmentParameteriv", function(target, attachment, pname, params)
		{
			var accepts = [gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING,
				gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE,
				gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME,
				gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE,
				gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE,
				gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE,
				gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER,
				gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getFramebufferAttachmentParameter(target, attachment, pname);
			switch(pname)
			{
			case gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING:
			case gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE:
			case gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:
				wc.writeMemoryUint32(params, got);
				break;
			case gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE:
			case gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER:
			case gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:
			case gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:
				wc.writeMemoryInt32(params, got);
				break;
			case gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:
				wc.writeMemoryUint32(params, WebGL4WASM.getIndexByWebGLObject(owner, got));
				break;
			}
		});
		wc.importFunction("glGetIntegerv", function(pname, data)
		{
			console.assert(pname in owner.glGetTypes || pname in owner.glGetObjects);
			var wrapper = function(g) {return g;}
			if (pname in owner.glGetObjects) wrapper = function(g) {return WebGL4WASM.getIndexByWebGLObject(owner, g);}
			var got = gl.getParameter(pname);
			if (pname in owner.glGetArraySizes)
			{
				var count = owner.glGetArraySizes[pname];
				for(var i = 0; i < count; i++)
				{
					wc.writeMemoryUint32(data + i, wrapper(got[i]));
				}
			}
			else
			{
				wc.writeMemoryUint32(data, wrapper(got));
			}
		});
		wc.importFunction("glGetProgramiv", function(program, pname, params)
		{
			var accepts = [gl.ACTIVE_ATTRIBUTES, gl.ACTIVE_ATTRIBUTE_MAX_LENGTH, gl.ACTIVE_UNIFORMS,
				gl.ACTIVE_UNIFORM_BLOCKS, gl.ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH, gl.ACTIVE_UNIFORM_MAX_LENGTH,
				gl.ATTACHED_SHADERS, gl.DELETE_STATUS, gl.INFO_LOG_LENGTH, gl.LINK_STATUS,
				gl.PROGRAM_BINARY_RETRIEVABLE_HINT, gl.TRANSFORM_FEEDBACK_BUFFER_MODE,
				gl.TRANSFORM_FEEDBACK_VARYINGS, gl.TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH, gl.VALIDATE_STATUS]
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			var got;
			var obj = conv[program];
			var activeCount;
			var maxLength = 0;
			switch(pname)
			{
			case gl.ATTACHED_SHADERS:
			case gl.ACTIVE_ATTRIBUTES:
			case gl.ACTIVE_UNIFORMS:
			case gl.TRANSFORM_FEEDBACK_VARYINGS:
			case gl.ACTIVE_UNIFORM_BLOCKS:
				got = gl.getProgramParameter(obj, pname);
				wc.writeMemoryInt32(params, got);
				return;
			case gl.TRANSFORM_FEEDBACK_BUFFER_MODE:
				got = gl.getProgramParameter(obj, pname);
				wc.writeMemoryUint32(params, got);
				return;
			case gl.DELETE_STATUS:
			case gl.LINK_STATUS:
			case gl.VALIDATE_STATUS:
				got = gl.getProgramParameter(obj, pname);
				wc.writeMemoryUint8(params, got);
				return;
			case gl.ACTIVE_ATTRIBUTE_MAX_LENGTH:
				activeCount = gl.getProgramParameter(obj, gl.ACTIVE_ATTRIBUTES);
				for(var i = 0; i < activeCount; i++)
				{
					var activeInfo = gl.getActiveAttrib(obj, i);
					if (activeInfo != null)
					{
						if (activeInfo.name.length > maxLength)
							maxLength = activeInfo.name.length;
					}
				}
				wc.writeMemoryInt32(params, maxLength);
				return;
			case gl.ACTIVE_UNIFORM_MAX_LENGTH:
				activeCount = gl.getProgramParameter(obj, gl.ACTIVE_UNIFORMS);
				for(var i = 0; i < activeCount; i++)
				{
					var activeInfo = gl.getActiveUniform(obj, i);
					if (activeInfo != null)
					{
						if (activeInfo.name.length > maxLength)
							maxLength = activeInfo.name.length;
					}
				}
				wc.writeMemoryInt32(params, maxLength);
				return;
			case gl.ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH:
				activeCount = gl.getProgramParameter(obj, gl.ACTIVE_UNIFORM_BLOCKS);
				for(var i = 0; i < activeCount; i++)
				{
					var blockName = gl.getActiveUniformBlockName(obj, i);
					if (blockName != null)
					{
						if (blockName.length > maxLength)
							maxLength = blockName.length;
					}
				}
				wc.writeMemoryInt32(params, maxLength);
				return;
			case gl.INFO_LOG_LENGTH:
				wc.writeMemoryInt32(params, gl.getProgramInfoLog(obj).length);
				return;
			case gl.PROGRAM_BINARY_RETRIEVABLE_HINT:
				wc.writeMemoryUint32(params, 0);
				return;
			case gl.TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH:
				var varyingCount = gl.getProgramParameter(obj, gl.TRANSFORM_FEEDBACK_VARYINGS);
				for(var i = 0; i < varyingCount; i++)
				{
					var activeInfo = gl.getTransformFeedbackVarying(obj, i);
					if (activeInfo != null)
					{
						if (activeInfo.name.length > maxLength)
							maxLength = activeInfo.name.length;
					}
				}
				wc.writeMemoryInt32(params, maxLength);
				return;
			default:
				wc.generateOutput("glGetProgramiv: Unknown pname " + pname.toString(16));
				console.assert(false);
			}
		});
		wc.importFunction("glGetProgramInfoLog", function(program, bufSize, length, infoLog)
		{
			var wroteLen = wc.writeString(infoLog, bufSize, gl.getProgramInfoLog(conv[program]));
			if (length) wc.writeMemoryInt32(length, wroteLen);
		});
		wc.importFunction("glGetRenderbufferParameteriv", function(target, pname, params)
		{
			var accepts = [gl.RENDERBUFFER_WIDTH,
				gl.RENDERBUFFER_HEIGHT,
				gl.RENDERBUFFER_INTERNAL_FORMAT,
				gl.RENDERBUFFER_RED_SIZE,
				gl.RENDERBUFFER_GREEN_SIZE,
				gl.RENDERBUFFER_BLUE_SIZE,
				gl.RENDERBUFFER_ALPHA_SIZE,
				gl.RENDERBUFFER_DEPTH_SIZE,
				gl.RENDERBUFFER_SAMPLES,
				gl.RENDERBUFFER_STENCIL_SIZE];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getRenderbufferParameter(target, pname);
			switch(pname)
			{
			case gl.RENDERBUFFER_WIDTH:
			case gl.RENDERBUFFER_HEIGHT:
			case gl.RENDERBUFFER_RED_SIZE:
			case gl.RENDERBUFFER_GREEN_SIZE:
			case gl.RENDERBUFFER_BLUE_SIZE:
			case gl.RENDERBUFFER_ALPHA_SIZE:
			case gl.RENDERBUFFER_DEPTH_SIZE:
			case gl.RENDERBUFFER_SAMPLES:
			case gl.RENDERBUFFER_STENCIL_SIZE:
				wc.writeMemoryInt32(params, got);
				return;
			case gl.RENDERBUFFER_INTERNAL_FORMAT:
				wc.writeMemoryUint32(params, got);
				return;
			}
		});
		wc.importFunction("glGetShaderiv", function(shader, pname, params)
		{
			var accepts = [gl.SHADER_TYPE,
				gl.DELETE_STATUS,
				gl.COMPILE_STATUS,
				gl.INFO_LOG_LENGTH,
				gl.SHADER_SOURCE_LENGTH];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var obj = conv[shader];
			switch(pname)
			{
			case gl.SHADER_TYPE:
				wc.writeMemoryUint32(params, gl.getShaderParameter(obj, pname));
				return;
			case gl.DELETE_STATUS:
			case gl.COMPILE_STATUS:
				wc.writeMemoryUint8(params, gl.getShaderParameter(obj, pname));
				return;
			case gl.INFO_LOG_LENGTH:
				wc.writeMemoryInt32(params, gl.getShaderInfoLog(obj).length);
				return;
			case gl.SHADER_SOURCE_LENGTH:
				wc.writeMemoryInt32(params, gl.getShaderSource(obj).length);
				return;
			}
		});
		wc.importFunction("glGetShaderInfoLog", function(shader, bufSize, length, infoLog)
		{
			var wrotelen = wc.writeString(infoLog, bufSize, gl.getShaderInfoLog(conv[shader]));
			if (length) wc.writeMemoryInt32(length, wrotelen);
		});
		wc.importFunction("glGetShaderPrecisionFormat", function(shadertype, precisiontype, range, precision)
		{
			var precisionFormat = gl.getShaderPrecisionFormat(shadertype, precisiontype);
			if (precisionFormat != null)
			{
				if (range)
				{
					wc.writeMemoryInt32(range + 0, precisionFormat.rangeMin);
					wc.writeMemoryInt32(range + 4, precisionFormat.rangeMax);
				}
				if (precision)
				{
					wc.writeMemoryInt32(precision, precisionFormat.precision);
				}
			}
		});
		wc.importFunction("glGetShaderSource", function(shader, bufSize, length, source)
		{
			var wrotelen = wc.writeString(source, bufSize, gl.getShaderSource(conv[shader]));
			if (length) wc.writeMemoryInt32(length, wrotelen);
		});
		wc.importFunction("glGetString", function(name)
		{
			switch(name)
			{
			case gl.EXTENSIONS: return this.pointerOfAllExtensionString;
			case gl.VENDOR: 
			case gl.RENDERER:
			case gl.VERSION:
			case gl.SHADING_LANGUAGE_VERSION:
			}
		})
		wc.importFunction("glGetTexParameterfv", function(target, pname, params)
		{
			var accepts =[gl.TEXTURE_BASE_LEVEL,
				gl.TEXTURE_COMPARE_FUNC,
				gl.TEXTURE_COMPARE_MODE,
				gl.TEXTURE_IMMUTABLE_FORMAT,
				gl.TEXTURE_IMMUTABLE_LEVELS,
				gl.TEXTURE_MAG_FILTER,
				gl.TEXTURE_MAX_LEVEL,
				gl.TEXTURE_MAX_LOD,
				gl.TEXTURE_MIN_FILTER,
				gl.TEXTURE_MIN_LOD,
				gl.TEXTURE_WRAP_R,
				gl.TEXTURE_WRAP_S,
				gl.TEXTURE_WRAP_T];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getTexParameter(target, pname);
			wc.writeMemoryFloat32(params, got);
		});
		wc.importFunction("glGetTexParameteriv", function(target, pname, params)
		{
			var accepts =[gl.TEXTURE_BASE_LEVEL,
				gl.TEXTURE_COMPARE_FUNC,
				gl.TEXTURE_COMPARE_MODE,
				gl.TEXTURE_IMMUTABLE_FORMAT,
				gl.TEXTURE_IMMUTABLE_LEVELS,
				gl.TEXTURE_MAG_FILTER,
				gl.TEXTURE_MAX_LEVEL,
				gl.TEXTURE_MAX_LOD,
				gl.TEXTURE_MIN_FILTER,
				gl.TEXTURE_MIN_LOD,
				gl.TEXTURE_WRAP_R,
				gl.TEXTURE_WRAP_S,
				gl.TEXTURE_WRAP_T];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getTexParameter(target, pname);
			wc.writeMemoryInt32(params, got);
		});
		var getUniformFunction = function(program, location, params)
		{
			var obj = conv[program];
			var locationObject = owner.getLocationObjectByIndex(obj, location);
			var locationName = owner.getLocationNameByLocationIndex(obj, location);
			var got = gl.getUniform(obj, locationObject);
			var activeCount = gl.getProgramParameter(obj, gl.ACTIVE_UNIFORMS);
			var activeType;
			var activeSize;
			for(var i = 0; i < activeCount; i++)
			{
				var activeInfo = gl.getActiveUniform(obj, i);
				if (activeInfo != null && activeInfo.name == locationName)
				{
					activeSize = activeInfo.size;
					activeType = activeInfo.type;
					var typeSize = WebGL4WASM.getSizeOfActiveType(owner, activeType);
					if (activeSize == 1 && typeSize == 1)
					{
						switch(activeType)
						{
						case gl.FLOAT: wc.writeMemoryFloat32(params, got); break;
						case gl.INT: wc.writeMemoryInt32(params, got); break;
						case gl.BOOL: wc.writeMemoryUint8(params, got); break;
						case gl.UNSIGNED_INT: wc.writeMemoryUint32(params, got); break;
						default: wc.writeMemory(params, got);
						}
					}
					else
					{
						wc.writeMemory(params, got);
					}
					return;
				}
			}
		};
		wc.importFunction("glGetUniformfv", getUniformFunction);
		wc.importFunction("glGetUniformiv", getUniformFunction);
		wc.importFunction("glGetUniformLocation", function(program, name)
		{
			var obj = conv[program];
			if (obj in owner.webGLUniformLocationForPrograms)
			{
				var locationInfo = owner.webGLUniformLocationForPrograms[obj];
				if (name in locationInfo) return locationInfo[name].index;
			}
			var locationObject = gl.getUniformLocation(obj, name);
			return owner.allocateIndexForUniformLocation(obj, name, locationObject);
		});
		var getVertexAttribFunction = function(index, pname, params)
		{
			var got = gl.getVertexAttrib(index, pname);
			switch(pname)
			{
			case gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: wc.writeMemoryUint32(params, WebGL4WASM.getIndexByWebGLObject(owner, got)); break;
			case gl.VERTEX_ATTRIB_ARRAY_ENABLED:
			case gl.VERTEX_ATTRIB_ARRAY_NORMALIZED:
			case gl.VERTEX_ATTRIB_ARRAY_INTEGER: wc.writeMemoryUint8(params, got); break;
			case gl.VERTEX_ATTRIB_ARRAY_SIZE:
			case gl.VERTEX_ATTRIB_ARRAY_STRIDE:
			case gl.VERTEX_ATTRIB_ARRAY_DIVISOR: wc.writeMemoryInt32(params, got); break;
			case gl.VERTEX_ATTRIB_ARRAY_TYPE: wc.writeMemoryUint32(params, got); break;
			case gl.CURRENT_VERTEX_ATTRIB: wc.writeMemory(params, got); break;
			}
		};
		wc.importFunction("glGetVertexAttribfv", getVertexAttribFunction);
		wc.importFunction("glGetVertexAttribiv", getVertexAttribFunction);
		wc.importFunction("glGetVertexAttribPointerv", (index, pname, pointer) => wc.writeMemoryPointer(pointer, gl.getVertexAttribOffset(index, pname)));
		wc.importFunction("glHint", (target, mode) => gl.hint(target, mode));
		var glIsXYZ = function(xyz, isXYZ_callable)
		{
			if (xyz == 0) return false;
			else if (xyz in conv) return isXYZ_callable(conv[xyz]);
			else return false;
		}
		wc.importFunction("glIsBuffer", function(buffer) { return glIsXYZ(buffer, function(obj){ return gl.isBuffer(obj);}); });
		wc.importFunction("glIsEnabled", function(cap){return gl.isEnabled(cap);});
		wc.importFunction("glIsFramebuffer", function(framebuffer) { return glIsXYZ(framebuffer, function(obj){ return gl.isFramebuffer(obj);}); });
		wc.importFunction("glIsProgram", function(program) { return glIsXYZ(program, function(obj){ return gl.isProgram(obj);}); });
		wc.importFunction("glIsRenderbuffer", function(renderbuffer) { return glIsXYZ(renderbuffer, function(obj){ return gl.isRenderbuffer(obj);}); });
		wc.importFunction("glIsShader", function(shader) { return glIsXYZ(shader, function(obj){ return gl.isShader(obj);}); });
		wc.importFunction("glIsTexture", function(texture) { return glIsXYZ(texture, function(obj){ return gl.isTexture(obj);}); });
		wc.importFunction("glLineWidth", (width) => gl.lineWidth(width));
		wc.importFunction("glLinkProgram", (program) => gl.linkProgram(conv[program]));
		wc.importFunction("glPixelStorei", function(pname, param)
		{
			gl.pixelStorei(pname, param);
			owner.pixelStoreiState[pname] = param;
		});
		wc.importFunction("glPolygonOffset", (factor, units) => gl.polygonOffset(factor, units));
		wc.importFunction("glReadPixels", function(x, y, width, height, format, type, pixels)
		{
			var packBuffer = null;
			if (gl.PIXEL_PACK_BUFFER in owner.webGLBufferBinding)
				packBuffer = owner.webGLBufferBinding[gl.PIXEL_PACK_BUFFER];
			if (packBuffer != null)
			{
				gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
				gl.readPixels(x, y, width, height, format, packBuffer, pixels);
				gl.bindBuffer(gl.PIXEL_PACK_BUFFER, packBuffer);
			}
			else
			{
				gl.readPixels(x, y, width, height, format, wc.membytes, pixels);
			}
		});
		wc.importFunction("glReleaseShaderCompiler", function(){});
		wc.importFunction("glRenderbufferStorage", (target, internalformat, width, height) => gl.renderbufferStorage(target, internalformat, width, height));
		wc.importFunction("glSampleCoverage", (value, invert) => gl.sampleCoverage(value, invert));
		wc.importFunction("glScissor", (x, y, width, height) => gl.scissor(x, y, width, height));
		wc.importFunction("glShaderBinary", function(count, shaders, binaryFormat, binary, length){console.assert(false)});
		wc.importFunction("glShaderSource", function(shader, count, string, length)
		{
			var shaderString = "";
			var stringPointers = wc.getMemoryPointer(string, count);
			for(var i = 0; i < count; i++)
			{
				shaderString += wc.getString(stringPointers[i]) + "\n";
			}
			wc.generateOutput("Compiling shader: \n" + shaderString);
			gl.shaderSource(conv[shader], shaderString);
		});
		wc.importFunction("glStencilFunc", (func, ref, mask) => gl.stencilFunc(func, ref, mask));
		wc.importFunction("glStencilFuncSeparate", (face, func, ref, mask) => gl.stencilFuncSeparate(face, func, ref, mask));
		wc.importFunction("glStencilMask", (mask) => gl.stencilMask(mask));
		wc.importFunction("glStencilMaskSeparate", (face, mask) => gl.stencilMaskSeparate(face, mask));
		wc.importFunction("glStencilOp", (fail, zfail, zpass) => gl.stencilOp(fail, zfail, zpass));
		wc.importFunction("glStencilOpSeparate", (face, sfail, dpfail, dppass) => gl.stencilOpSeparate(face, sfail, dpfail, dppass));
		wc.importFunction("glTexImage2D", function(target, level, internalformat, width, height, border, format, type, pixels)
		{
			var unpackBuffer = null;
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding)
				unpackBuffer = owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER];
			if (unpackBuffer != null)
			{
				gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
				gl.texImage2D(target, level, internalformat, width, height, border, format, type, unpackBuffer, pixels);
				gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
			}
			else
			{
				gl.texImage2D(target, level, internalformat, width, height, border, format, type, wc.membytes, pixels);
			}
		});
		wc.importFunction("glTexParameterf", (target, pname, param) => gl.texParameterf(target, pname, param));
		wc.importFunction("glTexParameterfv", (target, pname, params) => gl.texParameterf(target, pname, wc.getMemoryFloat32(params, 1)[0]));
		wc.importFunction("glTexParameteri", (target, pname, param) => gl.texParameter(target, pname, param));
		wc.importFunction("glTexParameteriv", (target, pname, params) => gl.texParameter(target, pname, wc.getMemoryInt32(params, 1)[0]));
		wc.importFunction("glTexSubImage2D", function(target, level, xoffset, yoffset, width, height, border, format, type, pixels)
		{
			var unpackBuffer = null;
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding)
				unpackBuffer = owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER];
			if (unpackBuffer != null)
			{
				gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
				gl.texSubImage2D(target, level, xoffset, yoffset, width, height, border, format, type, unpackBuffer, pixels);
				gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
			}
			else
			{
				gl.texSubImage2D(target, level, xoffset, yoffset, width, height, border, format, type, wc.membytes, pixels);
			}
		});
		wc.importFunction("glUniform1f", (location, v0) => gl.uniform1f(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0));
		wc.importFunction("glUniform1i", (location, v0) => gl.uniform1i(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0));
		wc.importFunction("glUniform2f", (location, v0, v1) => gl.uniform2f(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1));
		wc.importFunction("glUniform2i", (location, v0, v1) => gl.uniform2i(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1));
		wc.importFunction("glUniform3f", (location, v0, v1, v2) => gl.uniform3f(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2));
		wc.importFunction("glUniform3i", (location, v0, v1, v2) => gl.uniform3i(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2));
		wc.importFunction("glUniform4f", (location, v0, v1, v2, v3) => gl.uniform4f(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2, v3));
		wc.importFunction("glUniform4i", (location, v0, v1, v2, v3) => gl.uniform4i(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2, v3));
		wc.importFunction("glUniform1fv", (location, count, value) => gl.uniform1fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count)));
		wc.importFunction("glUniform1iv", (location, count, value) => gl.uniform1iv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryInt32(value, count)));
		wc.importFunction("glUniform2fv", (location, count, value) => gl.uniform2fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count)));
		wc.importFunction("glUniform2iv", (location, count, value) => gl.uniform2iv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryInt32(value, count)));
		wc.importFunction("glUniform3fv", (location, count, value) => gl.uniform3fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count)));
		wc.importFunction("glUniform3iv", (location, count, value) => gl.uniform3iv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryInt32(value, count)));
		wc.importFunction("glUniform4fv", (location, count, value) => gl.uniform4fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count)));
		wc.importFunction("glUniform4iv", (location, count, value) => gl.uniform4iv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryInt32(value, count)));
		wc.importFunction("glUniformMatrix2fv", (location, count, transpose, value) => gl.uniformMatrix2fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 4)));
		wc.importFunction("glUniformMatrix3fv", (location, count, transpose, value) => gl.uniformMatrix3fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 9)));
		wc.importFunction("glUniformMatrix4fv", (location, count, transpose, value) => gl.uniformMatrix4fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 16)));
		wc.importFunction("glUseProgram", function(program)
		{
			if (program)
			{
				var obj = conv[program];
				gl.useProgram(obj);
				owner.currentProgram = obj;
			}
			else
			{
				gl.useProgram(null);
				owner.currentProgram = null;
			}
		});
		wc.importFunction("glValidateProgram", (program) => gl.validateProgram(conv[program]));
		wc.importFunction("glVertexAttrib1f", (index, x) => gl.vertexAttrib1f(index, x));
		wc.importFunction("glVertexAttrib2f", (index, x, y) => gl.vertexAttrib2f(index, x, y));
		wc.importFunction("glVertexAttrib3f", (index, x, y, z) => gl.vertexAttrib3f(index, x, y, z));
		wc.importFunction("glVertexAttrib4f", (index, x, y, z, w) => gl.vertexAttrib4f(index, x, y, z, w));
		wc.importFunction("glVertexAttrib1fv", (index, v) => gl.vertexAttrib1fv(index, wc.getMemoryFloat32(v, 1)));
		wc.importFunction("glVertexAttrib2fv", (index, v) => gl.vertexAttrib2fv(index, wc.getMemoryFloat32(v, 2)));
		wc.importFunction("glVertexAttrib3fv", (index, v) => gl.vertexAttrib3fv(index, wc.getMemoryFloat32(v, 3)));
		wc.importFunction("glVertexAttrib4fv", (index, v) => gl.vertexAttrib4fv(index, wc.getMemoryFloat32(v, 4)));
		wc.importFunction("glVertexAttribPointer", (index, size, type, normalized, stride, pointer) => gl.vertexAttribPointer(index, size, type, normalized, stride, pointer));
		wc.importFunction("glViewport", (x, y, width, height) => gl.viewport(x, y, width, height));
		// Here comes GLES3 APIs
		wc.importFunction("glReadBuffer", (src) => gl.readBuffer(src));
		wc.importFunction("glDrawRangeElements", function(mode, start, end, count, type, indices)
		{
			if (gl.ELEMENT_ARRAY_BUFFER in bufferBinding && bufferBinding[gl.ELEMENT_ARRAY_BUFFER] != null)
			{
				gl.drawRangeElements(mode, start, end, count, type, indices);
			}
			else
			{
				console.assert(indices);
				var size = count;
				switch(type)
				{
				case gl.UNSIGNED_BYTE: break;
				case gl.UNSIGNED_SHORT: size *= 2; break;
				case gl.UNSIGNED_INT: size *= 4; break;
				default: return;
				}
				var elementArrayBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wc.getMemory(indices, size), gl.STATIC_DRAW);
				gl.drawRangeElements(mode, start, end, count, type, 0);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
				gl.deleteBuffer(elementArrayBuffer);
			}
		});
		wc.importFunction("glTexImage3D", function(target, level, internalformat, width, height, depth, border, format, type, pixels)
		{
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding && owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER] != null)
			{
				gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, pixels);
			}
			else
			{
				console.assert(pixels);
				gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, wc.membytes, pixels);
			}
		});
		wc.importFunction("glTexSubImage3D", function(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels)
		{
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding && owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER] != null)
			{
				gl.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
			}
			else
			{
				console.assert(pixels);
				gl.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, wc.membytes, pixels);
			}
		});
		wc.importFunction("glCopyTexSubImage3D", (target, level, xoffset, yoffset, zoffset, x, y, width, height) => gl.copyTexSubImage3D(target, level, xoffset, yoffset, zoffset, x, y, width, height));
		wc.importFunction("glCompressedTexImage3D", function(target, level, internalformat, width, height, depth, border, imageSize, data)
		{
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding && owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER] != null)
			{
				gl.compressedTexImage3D(target, level, internalformat, width, height, depth, border, imageSize, data);
			}
			else
			{
				console.assert(data);
				gl.compressedTexImage3D(target, level, internalformat, width, height, depth, border, wc.getMemory(data, imageSize));
			}
		});
		wc.importFunction("glCompressedTexSubImage3D", function(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data)
		{
			if (gl.PIXEL_UNPACK_BUFFER in owner.webGLBufferBinding && owner.webGLBufferBinding[gl.PIXEL_UNPACK_BUFFER] != null)
			{
				gl.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
			}
			else
			{
				console.assert(data);
				gl.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, wc.getMemory(data, imageSize));
			}
		});
		wc.importFunction("glGenQueries", (n, ids) => glGenXYZ(n, ids, function(){ return gl.createQuery();}));
		wc.importFunction("glDeleteQueries", (n, ids) => glDeleteXYZ(n, ids, obj => gl.deleteQuery(obj)));
		wc.importFunction("glIsQuery", function(id) { return glIsXYZ(id, function(obj){ return gl.isQuery(obj);}); });
		wc.importFunction("glBeginQuery", (target, id) => gl.beginQuery(target, conv[id]));
		wc.importFunction("glEndQuery", (target) => gl.endQuery(target));
		wc.importFunction("glGetQueryiv", function(target, pname, params)
		{
			var query = gl.getQuery(target, pname);
			if (query == null)
				wc.writeMemoryInt32(params, 0);
			else
				wc.writeMemoryInt32(params, WebGL4WASM.getIndexByWebGLObject(owner, query));
		});
		wc.importFunction("glGetQueryObjectuiv", function(id, pname, params)
		{
			var query = conv[id];
			var got = gl.getQueryParameter(query, pname);
			switch(pname)
			{
			case gl.QUERY_RESULT:
				wc.writeMemoryUint32(params, got);
				break;
			case gl.QUERY_RESULT_AVAILABLE:
				wc.writeMemoryUint8(params, got);
				break;
			}
		});
		wc.importFunction("glUnmapBuffer", function(target)
		{
			if (target in owner.mappedBuffers)
			{
				var mapInfo = owner.mappedBuffers[target];
				if ((mapInfo.access & gl.MAP_WRITE_BIT) == gl.MAP_WRITE_BIT)
				{
					gl.bufferSubData(target, mapInfo.offset, wc.getMemory(mapInfo.pointer, mapInfo.length));
				}
				wc.freeMemory(mapInfo.pointer);
				delete owner.mappedBuffers[target];
				return true;
			}
			else
			{
				return false;
			}
		});
		wc.importFunction("glGetBufferPointerv", function(target, pname, params)
		{
			console.assert(target in owner.mappedBuffers);
			console.assert(pname == gl.BUFFER_MAP_POINTER);
			var mapInfo = owner.mappedBuffers[target];
			wc.writeMemoryPointer(params, mapInfo.pointer);
		});
		wc.importFunction("glDrawBuffers", function(n, bufs)
		{
			console.assert(n, bufs);
			gl.drawBuffers(wc.getMemoryPointer(bufs, n));
		});
		wc.importFunction("glUniformMatrix2x3fv", (location, count, transpose, value) => gl.uniformMatrix2x3fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 6)));
		wc.importFunction("glUniformMatrix3x2fv", (location, count, transpose, value) => gl.uniformMatrix3x2fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 6)));
		wc.importFunction("glUniformMatrix2x4fv", (location, count, transpose, value) => gl.uniformMatrix2x4fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 8)));
		wc.importFunction("glUniformMatrix4x2fv", (location, count, transpose, value) => gl.uniformMatrix4x2fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 8)));
		wc.importFunction("glUniformMatrix3x4fv", (location, count, transpose, value) => gl.uniformMatrix3x4fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 12)));
		wc.importFunction("glUniformMatrix4x3fv", (location, count, transpose, value) => gl.uniformMatrix4x3fv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryFloat32(value, count * 12)));
		wc.importFunction("glBlitFramebuffer", (srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter) => gl.blitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter));
		wc.importFunction("glRenderbufferStorageMultisample", (target, samples, internalformat, width, height) => gl.renderbufferStorageMultisample(target, samples, internalformat, width, height));
		wc.importFunction("glFramebufferTextureLayer", (target, attachment, texture, level, layer) => gl.framebufferTextureLayer(target, attachment, conv[texture], level, layer));
		wc.importFunction("glMapBufferRange", function(target, offset, length, access)
		{
			var pointer = wc.allocateMemory(length);
			owner.mappedBuffers[target] =
			{
				"pointer": pointer,
				"access": access,
				"offset": offset,
				"length": length
			};
			if ((mapInfo.access & gl.MAP_READ_BIT) == gl.MAP_READ_BIT)
			{
				gl.getBufferSubData(target, offset, wc.membytes, pointer, length);
			}
			return pointer;
		});
		wc.importFunction("glFlushMappedBufferRange", function(target, offset, length)
		{
			console.assert (target in owner.mappedBuffers);
			var mapInfo = owner.mappedBuffers[target];
			if ((mapInfo.access & gl.MAP_WRITE_BIT) == gl.MAP_WRITE_BIT)
			{
				gl.bufferSubData(target, mapInfo.offset + offset, wc.getMemory(mapInfo.pointer + offset, length));
			}
		});
		wc.importFunction("glBindVertexArray", array => gl.bindVertexArray(conv[array]));
		wc.importFunction("glDeleteVertexArrays", (n, arrays) => glDeleteXYZ(n, arrays, obj => gl.deleteVertexArray(obj)));
		wc.importFunction("glGenVertexArrays", (n, arrays) => glGenXYZ(n, arrays, function(){ return gl.createVertexArray();}));
		wc.importFunction("glIsVertexArray", function(arrays) { return glIsXYZ(arrays, function(obj){ return gl.isVertexArray(obj);}); });
		wc.importFunction("glGetIntegeri_v", function(target, index, data)
		{
			console.assert(target in owner.glGetTypes || target in owner.glGetObjects);
			var wrapper = function(g) {return g;}
			if (target in owner.glGetObjects) wrapper = function(g) {return WebGL4WASM.getIndexByWebGLObject(owner, g);}
			wc.writeMemoryInt32(data, wrapper(gl.getIndexedParameter(target)));
		});
		wc.importFunction("glBeginTransformFeedback", primitiveMode => gl.beginTransformFeedback(primitiveMode));
		wc.importFunction("glEndTransformFeedback", () => gl.endTransformFeedback());
		wc.importFunction("glBindBufferRange", (target, index, buffer, offset, size) => gl.bindBufferRange(target, index, conv[buffer], offset, size));
		wc.importFunction("glBindBufferBase", (target, index, buffer) => gl.bindBufferBase(target, index, conv[buffer]));
		wc.importFunction("glTransformFeedbackVaryings", function(program, count, varyings, bufferMode)
		{
			gl.transformFeedbackVaryings(conv[program], wc.getStringArray(varyings, count), bufferMode);
		});
		wc.importFunction("glGetTransformFeedbackVarying", function(program, index, bufSize, length, size, type, name)
		{
			activeInfo = gl.getTransformFeedbackVarying(conv[program], index);
			wc.writeMemoryInt32(size, activeInfo.size);
			wc.writeMemoryUint32(type, activeInfo.type);
			var writeLen = wc.writeString(name, bufSize, activeInfo.name);
			if (length) wc.writeMemoryUint32(length, writeLen);
		});
		wc.importFunction("glVertexAttribIPointer", (index, size, type, stride, pointer) => gl.vertexAttribPointer(index, size, type, normalized, stride, pointer));
		wc.importFunction("glGetVertexAttribIiv", getVertexAttribFunction);
		wc.importFunction("glGetVertexAttribIuiv", getVertexAttribFunction);
		wc.importFunction("glVertexAttribI4i", (index, x, y, z, w) => gl.vertexAttribI4i(index, x, y, z, w));
		wc.importFunction("glVertexAttribI4ui", (index, x, y, z, w) => gl.vertexAttribI4ui(index, x, y, z, w));
		wc.importFunction("glVertexAttribI4iv", (index, v) => gl.vertexAttribI4iv(index, wc.getMemoryInt32(v, 4)));
		wc.importFunction("glVertexAttribI4uiv", (index, v) => gl.vertexAttribI4uiv(index, wc.getMemoryUint32(v, 4)));
		wc.importFunction("glGetUniformuiv", getUniformFunction);
		wc.importFunction("glGetFragDataLocation", (program, name) => gl.getFragDataLocation(conv[program], wc.getString(name)));
		wc.importFunction("glUniform1ui", (location, v0) => gl.uniform1ui(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0));
		wc.importFunction("glUniform2ui", (location, v0, v1) => gl.uniform2ui(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1));
		wc.importFunction("glUniform3ui", (location, v0, v1, v2) => gl.uniform3ui(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2));
		wc.importFunction("glUniform4ui", (location, v0, v1, v2, v3) => gl.uniform4ui(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), v0, v1, v2, v3));
		wc.importFunction("glUniform1uiv", (location, count, value) => gl.uniform1uiv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryUint32(value, count)));
		wc.importFunction("glUniform2uiv", (location, count, value) => gl.uniform2uiv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryUint32(value, count)));
		wc.importFunction("glUniform3uiv", (location, count, value) => gl.uniform3uiv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryUint32(value, count)));
		wc.importFunction("glUniform4uiv", (location, count, value) => gl.uniform4uiv(WebGL4WASM.getLocationObjectByIndex(owner, owner.currentProgram, location), wc.getMemoryUint32(value, count)));
		wc.importFunction("glClearBufferiv", function(buffer, drawbuffer, value)
		{
			var buffers;
			switch(buffer)
			{
			case gl.COLOR_BUFFER: buffers = wc.getMemoryInt32(value, 4); break;
			default: buffers = wc.getMemoryInt32(value, 1); break;
			}
			gl.clearBufferiv(buffer, drawbuffer, buffers);
		});
		wc.importFunction("glClearBufferuiv", function(buffer, drawbuffer, value)
		{
			var buffers;
			switch(buffer)
			{
			case gl.COLOR_BUFFER: buffers = wc.getMemoryUint32(value, 4); break;
			default: buffers = wc.getMemoryUint32(value, 1); break;
			}
			gl.clearBufferuiv(buffer, drawbuffer, buffers);
		});
		wc.importFunction("glClearBufferfv", function(buffer, drawbuffer, value)
		{
			var buffers;
			switch(buffer)
			{
			case gl.COLOR_BUFFER: buffers = wc.getMemoryFloat32(value, 4); break;
			default: buffers = wc.getMemoryFloat32(value, 1); break;
			}
			gl.clearBufferfv(buffer, drawbuffer, buffers);
		});
		wc.importFunction("glClearBufferfi", (buffer, drawbuffer, depth, stencil) => gl.clearBufferfi(buffer, drawbuffer, depth, stencil));
		wc.importFunction("glGetStringi", function(name, index)
		{
			console.assert(name == gl.EXTENSIONS);
			return owner.pointerOfExtensionStrings[index];
		});
		wc.importFunction("glCopyBufferSubData", (readTarget, writeTarget, readOffset, writeOffset, size) => gl.copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size));
		wc.importFunction("glGetUniformIndices", function(program, uniformCount, uniformNames, uniformIndices)
		{
			var indices = gl.getUniformIndices(conv[program], wc.getStringArray(uniformNames, uniformCount));
			var write = new Uint32Array(indices.length);
			for(var i in indices) write[i] = indices[i];
			wc.writeMemory(uniformIndices, indices);
		})
		wc.importFunction("glGetActiveUniformsiv", function(program, uniformCount, uniformIndices, pname, params)
		{
			var accepts = [gl.UNIFORM_TYPE,
				gl.UNIFORM_SIZE,
				gl.UNIFORM_BLOCK_INDEX,
				gl.UNIFORM_OFFSET,
				gl.UNIFORM_ARRAY_STRIDE,
				gl.UNIFORM_MATRIX_STRIDE,
				gl.UNIFORM_IS_ROW_MAJOR];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			var uniforms = wc.getMemoryUint32(uniformIndices, uniformCount);
			var write;
			var obj = conv[program];
			if (pname in accepts)
			{
				var got = getActiveUniforms(obj, uniforms, pname);
				switch(pname)
				{
				case gl.UNIFORM_TYPE:
				case gl.UNIFORM_SIZE:
					write = new Uint32Array(got.length); break;
				case gl.UNIFORM_BLOCK_INDEX:
				case gl.UNIFORM_OFFSET:
				case gl.UNIFORM_ARRAY_STRIDE:
				case gl.UNIFORM_MATRIX_STRIDE:
					write = new Int32Array(got.length); break;
				case gl.UNIFORM_IS_ROW_MAJOR:
					write = new Uint8Array(got.length); break;
				}
				for(var i in got) write[i] = got[i];
			}
			else if (pname == gl.UNIFORM_NAME_LENGTH)
			{
				write = new Int32Array(uniformCount);
				for(var i in uniforms)
				{
					write[i] = gl.getActiveUniform(obj, uniforms[i]).name.length;
				}
			}
			else
			{
				console.assert(false);
			}
			wc.writeMemory(params, write);
		})
		wc.importFunction("glGetUniformBlockIndex", function(program, uniformBlockName) {return gl.getUniformBlockIndex(conv[program], wc.getString(uniformBlockName));});
		wc.importFunction("glGetActiveUniformBlockiv", function(program, uniformBlockIndex, pname, params)
		{
			var accepts = [gl.UNIFORM_BLOCK_BINDING,
				gl.UNIFORM_BLOCK_DATA_SIZE,
				gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS,
				gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES,
				gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER,
				gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getActiveUniformBlockParameter(conv[program], uniformBlockIndex, pname);
			switch(pname)
			{
			case gl.UNIFORM_BLOCK_BINDING:
			case gl.UNIFORM_BLOCK_DATA_SIZE:
			case gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS:
				wc.writeMemoryUint32(params, got);
				break;
			case gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES:
				wc.writeMemory(got);
				break;
			case gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER:
			case gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER:
				wc.writeMemoryUint8(params, got);
				break;
			}
		});
		wc.importFunction("glGetActiveUniformBlockName", function(program, uniformBlockIndex, bufSize, length, uniformBlockName)
		{
			var wroteLen = wc.writeString(uniformBlockName, bufSize, gl.getActiveUniformBlockName(conv[program], uniformBlockIndex));
			if (length) wc.writeMemoryInt32(length, wroteLen);
		});
		wc.importFunction("glUniformBlockBinding", (program, uniformBlockIndex, uniformBlockBinding) => gl.uniformBlockBinding(conv[program], uniformBlockIndex, uniformBlockBinding));
		wc.importFunction("glDrawArraysInstanced", (mode, first, count, instanceCount) => gl.drawArraysInstanced(mode, first, count, instanceCount));
		wc.importFunction("glDrawElementsInstanced", function(mode, count, type, indices, instancecount)
		{
			if (gl.ELEMENT_ARRAY_BUFFER in bufferBinding && bufferBinding[gl.ELEMENT_ARRAY_BUFFER] != null)
			{
				gl.drawElementsInstanced(mode, count, type, indices, instancecount);
			}
			else
			{
				console.assert(indices);
				var size = count;
				switch(type)
				{
				case gl.UNSIGNED_BYTE: break;
				case gl.UNSIGNED_SHORT: size *= 2; break;
				case gl.UNSIGNED_INT: size *= 4; break;
				default: return;
				}
				var elementArrayBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wc.getMemory(indices, size), gl.STATIC_DRAW);
				gl.drawElementsInstanced(mode, count, type, 0, instancecount);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
				gl.deleteBuffer(elementArrayBuffer);
			}
		});
		wc.importFunction("glFenceSync", function(condition, flags) { return WebGL4WASM.allocateIndexForWebGLObject(owner, gl.fenceSync(condition, flags)); });
		wc.importFunction("glIsSync", function(sync){ return glIsXYZ(sync, function(obj){ return gl.isSync(obj);}); });
		wc.importFunction("glDeleteSync", sync => glDeleteX(sync, obj => gl.deleteSync(obj)));
		wc.importFunction("glClientWaitSync", function(sync, flags, timeout) { return gl.clientWaitSync(conv[sync], flags, timeout); });
		wc.importFunction("glWaitSync", (sync, flags, timeout) => gl.waitSync(conv[sync], flags, timeout));
		wc.importFunction("glGetInteger64v", function(pname, data)
		{
			console.assert(pname in owner.glGetTypes || pname in owner.glGetObjects);
			var wrapper = function(g) {return g;}
			if (pname in owner.glGetObjects) wrapper = function(g) {return WebGL4WASM.getIndexByWebGLObject(owner, g);}
			var got = gl.getParameter(pname);
			if (pname in owner.glGetArraySizes)
			{
				var count = owner.glGetArraySizes[pname];
				for(var i = 0; i < count; i++)
				{
					wc.writeMemoryUint64(data + i, wrapper(got[i]));
				}
			}
			else
			{
				wc.writeMemoryUint64(data, wrapper(got));
			}
		});
		wc.importFunction("glGetSynciv", function(sync, pname, count, length, values)
		{
			console.assert(bufSize);
			if (length) wc.writeMemoryInt32(length, 1);
			wc.writeMemoryInt32(values, gl.getSyncParameter(conv[sync], pname));
		});
		wc.importFunction("glGetInteger64i_v", function(target, index, data)
		{
			console.assert(target in owner.glGetTypes || target in owner.glGetObjects);
			var wrapper = function(g) {return g;}
			if (target in owner.glGetObjects) wrapper = function(g) {return WebGL4WASM.getIndexByWebGLObject(owner, g);}
			wc.writeMemoryInt64(data, wrapper(gl.getIndexedParameter(target)));
		});
		wc.importFunction("glGetBufferParameteri64v", function(target, pname, params)
		{
			var accepts = [gl.BUFFER_SIZE, gl.BUFFER_USAGE];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getBufferParameter(target, pname);
			switch(pname)
			{
			case gl.BUFFER_SIZE: wc.writeMemoryInt64(params, got); break;
			case gl.BUFFER_USAGE: wc.writeMemoryUint64(params, got); break;
			}
		});
		wc.importFunction("glGenSamplers", (count, samplers) => glGenXYZ(count, samplers, function(){ return gl.createSampler();}));
		wc.importFunction("glDeleteSamplers", (count, samplers) => glDeleteXYZ(count, samplers, obj => gl.deleteSampler(obj)));
		wc.importFunction("glIsSampler", function(samplers){return glIsXYZ(samplers, function(obj){ return gl.isSampler(obj);});});
		wc.importFunction("glBindSampler", (unit, sampler) => gl.bindSampler(unit, conv[sampler]));
		wc.importFunction("glSamplerParameteri", (sampler, pname, param) => gl.samplerParameteri(conv[sampler], pname, param));
		wc.importFunction("glSamplerParameteriv", (sampler, pname, param) => gl.samplerParameteri(conv[sampler], pname, wc.getMemoryInt32(param, 1)[0]));
		wc.importFunction("glSamplerParameterf", (sampler, pname, param) => gl.samplerParameterf(conv[sampler], pname, param));
		wc.importFunction("glSamplerParameterfv", (sampler, pname, param) => gl.samplerParameterf(conv[sampler], pname, wc.getMemoryFloat32(param, 1)[0]));
		var glGetSamplerParameterFunction = function(sampler, pname, params)
		{
			var accepts = [gl.TEXTURE_COMPARE_FUNC,
				gl.TEXTURE_COMPARE_MODE,
				gl.TEXTURE_MAG_FILTER,
				gl.TEXTURE_MAX_LOD,
				gl.TEXTURE_MIN_FILTER,
				gl.TEXTURE_MIN_LOD,
				gl.TEXTURE_WRAP_R,
				gl.TEXTURE_WRAP_S,
				gl.TEXTURE_WRAP_T];
			console.assert(WebGL4WASM.isValidAccepts(accepts));
			console.assert(accepts.indexOf(pname) != -1);
			var got = gl.getSamplerParameter(conv[sampler], pname);
			switch(pname)
			{
			case gl.TEXTURE_COMPARE_FUNC:
			case gl.TEXTURE_COMPARE_MODE:
			case gl.TEXTURE_MAG_FILTER:
			case gl.TEXTURE_MIN_FILTER:
			case gl.TEXTURE_WRAP_R:
			case gl.TEXTURE_WRAP_S:
			case gl.TEXTURE_WRAP_T:
				wc.writeMemoryUint32(params, got);
				break;
			case gl.TEXTURE_MAX_LOD:
			case gl.TEXTURE_MIN_LOD:
				wc.writeMemoryFloat32(params, got);
				break;
			}
		};
		wc.importFunction("glGetSamplerParameteriv", glGetSamplerParameterFunction);
		wc.importFunction("glGetSamplerParameterfv", glGetSamplerParameterFunction);
		wc.importFunction("glVertexAttribDivisor", (index, divisor) => gl.vertexAttribDivisor(index, divisor));
		wc.importFunction("glBindTransformFeedback", (target, id) => gl.bindTransformFeedback (target, conv[id]));
		wc.importFunction("glDeleteTransformFeedbacks", (n, ids) => glDeleteXYZ(n, ids, obj => gl.deleteTransformFeedback(obj)));
		wc.importFunction("glGenTransformFeedbacks", (n, ids) => glGenXYZ(n, ids, function(){ return gl.createTransformFeedback();}));
		wc.importFunction("glIsTransformFeedback", function(id){ return glIsXYZ(id, function(obj){ return gl.isTransformFeedback(obj);}); });
		wc.importFunction("glPauseTransformFeedback", () => gl.pauseTransformFeedback());
		wc.importFunction("glResumeTransformFeedback", () => gl.resumeTransformFeedback());
		wc.importFunction("glGetProgramBinary", (program, bufSize, length, binaryFormat, binary) => console.assert(false));
		wc.importFunction("glProgramBinary", (program, binaryFormat, binary, length) => console.assert(false));
		wc.importFunction("glProgramParameteri", function(program, pname, value)
		{
			console.assert(pname == gl.PROGRAM_BINARY_RETRIEVABLE_HINT);
			console.assert(value == 0);
		});
		wc.importFunction("glInvalidateFramebuffer", (target, numAttachments, attachments) => gl.invalidateFramebuffer(target, wc.getMemoryUint32(attachments, numAttachments)));
		wc.importFunction("glInvalidateSubFramebuffer", (target, numAttachments, attachments, x, y, width, height) => gl.invalidateSubFramebuffer(target, wc.getMemoryUint32(attachments, numAttachments), x, y, width, height));
		wc.importFunction("glTexStorage2D", (target, levels, internalformat, width, height) => gl.texStorage2D(target, levels, internalformat, width, height));
		wc.importFunction("glTexStorage3D", (target, levels, internalformat, width, height, depth) => gl.texStorage3D(target, levels, internalformat, width, height, depth));
		wc.importFunction("glGetInternalformativ", (target, internalformat, pname, count, params) => wc.writeMemory(params, gl.getInternalformatParameter(target, internalformat, pname)));
		return wc;
	}
};
