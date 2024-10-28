/*
 * gstwebrtc-api
 *
 * Copyright (C) 2022 Igalia S.L. <info@igalia.com>
 *   Author: Loïc Le Page <llepage@igalia.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// mapping is based on https://www.cl.cam.ac.uk/~mgk25/ucs/keysyms.txt
const uniToKeySyms = Object.freeze({
  0x0020: "space",
  0x0021: "exclam",
  0x0022: "quotedbl",
  0x0023: "numbersign",
  0x0024: "dollar",
  0x0025: "percent",
  0x0026: "ampersand",
  0x0027: "apostrophe",
  0x0028: "parenleft",
  0x0029: "parenright",
  0x002a: "asterisk",
  0x002b: "plus",
  0x002c: "comma",
  0x002d: "minus",
  0x002e: "period",
  0x002f: "slash",
  0x0030: "0",
  0x0031: "1",
  0x0032: "2",
  0x0033: "3",
  0x0034: "4",
  0x0035: "5",
  0x0036: "6",
  0x0037: "7",
  0x0038: "8",
  0x0039: "9",
  0x003a: "colon",
  0x003b: "semicolon",
  0x003c: "less",
  0x003d: "equal",
  0x003e: "greater",
  0x003f: "question",
  0x0040: "at",
  0x0041: "A",
  0x0042: "B",
  0x0043: "C",
  0x0044: "D",
  0x0045: "E",
  0x0046: "F",
  0x0047: "G",
  0x0048: "H",
  0x0049: "I",
  0x004a: "J",
  0x004b: "K",
  0x004c: "L",
  0x004d: "M",
  0x004e: "N",
  0x004f: "O",
  0x0050: "P",
  0x0051: "Q",
  0x0052: "R",
  0x0053: "S",
  0x0054: "T",
  0x0055: "U",
  0x0056: "V",
  0x0057: "W",
  0x0058: "X",
  0x0059: "Y",
  0x005a: "Z",
  0x005b: "bracketleft",
  0x005c: "backslash",
  0x005d: "bracketright",
  0x005e: "asciicircum",
  0x005f: "underscore",
  0x0060: "grave",
  0x0061: "a",
  0x0062: "b",
  0x0063: "c",
  0x0064: "d",
  0x0065: "e",
  0x0066: "f",
  0x0067: "g",
  0x0068: "h",
  0x0069: "i",
  0x006a: "j",
  0x006b: "k",
  0x006c: "l",
  0x006d: "m",
  0x006e: "n",
  0x006f: "o",
  0x0070: "p",
  0x0071: "q",
  0x0072: "r",
  0x0073: "s",
  0x0074: "t",
  0x0075: "u",
  0x0076: "v",
  0x0077: "w",
  0x0078: "x",
  0x0079: "y",
  0x007a: "z",
  0x007b: "braceleft",
  0x007c: "bar",
  0x007d: "braceright",
  0x007e: "asciitilde",
  0x00a0: "nobreakspace",
  0x00a1: "exclamdown",
  0x00a2: "cent",
  0x00a3: "sterling",
  0x00a4: "currency",
  0x00a5: "yen",
  0x00a6: "brokenbar",
  0x00a7: "section",
  0x00a8: "diaeresis",
  0x00a9: "copyright",
  0x00aa: "ordfeminine",
  0x00ab: "guillemotleft",
  0x00ac: "notsign",
  0x00ad: "hyphen",
  0x00ae: "registered",
  0x00af: "macron",
  0x00b0: "degree",
  0x00b1: "plusminus",
  0x00b2: "twosuperior",
  0x00b3: "threesuperior",
  0x00b4: "acute",
  0x00b5: "mu",
  0x00b6: "paragraph",
  0x00b7: "periodcentered",
  0x00b8: "cedilla",
  0x00b9: "onesuperior",
  0x00ba: "masculine",
  0x00bb: "guillemotright",
  0x00bc: "onequarter",
  0x00bd: "onehalf",
  0x00be: "threequarters",
  0x00bf: "questiondown",
  0x00c0: "Agrave",
  0x00c1: "Aacute",
  0x00c2: "Acircumflex",
  0x00c3: "Atilde",
  0x00c4: "Adiaeresis",
  0x00c5: "Aring",
  0x00c6: "AE",
  0x00c7: "Ccedilla",
  0x00c8: "Egrave",
  0x00c9: "Eacute",
  0x00ca: "Ecircumflex",
  0x00cb: "Ediaeresis",
  0x00cc: "Igrave",
  0x00cd: "Iacute",
  0x00ce: "Icircumflex",
  0x00cf: "Idiaeresis",
  0x00d0: "ETH",
  0x00d1: "Ntilde",
  0x00d2: "Ograve",
  0x00d3: "Oacute",
  0x00d4: "Ocircumflex",
  0x00d5: "Otilde",
  0x00d6: "Odiaeresis",
  0x00d7: "multiply",
  0x00d8: "Ooblique",
  0x00d9: "Ugrave",
  0x00da: "Uacute",
  0x00db: "Ucircumflex",
  0x00dc: "Udiaeresis",
  0x00dd: "Yacute",
  0x00de: "THORN",
  0x00df: "ssharp",
  0x00e0: "agrave",
  0x00e1: "aacute",
  0x00e2: "acircumflex",
  0x00e3: "atilde",
  0x00e4: "adiaeresis",
  0x00e5: "aring",
  0x00e6: "ae",
  0x00e7: "ccedilla",
  0x00e8: "egrave",
  0x00e9: "eacute",
  0x00ea: "ecircumflex",
  0x00eb: "ediaeresis",
  0x00ec: "igrave",
  0x00ed: "iacute",
  0x00ee: "icircumflex",
  0x00ef: "idiaeresis",
  0x00f0: "eth",
  0x00f1: "ntilde",
  0x00f2: "ograve",
  0x00f3: "oacute",
  0x00f4: "ocircumflex",
  0x00f5: "otilde",
  0x00f6: "odiaeresis",
  0x00f7: "division",
  0x00f8: "oslash",
  0x00f9: "ugrave",
  0x00fa: "uacute",
  0x00fb: "ucircumflex",
  0x00fc: "udiaeresis",
  0x00fd: "yacute",
  0x00fe: "thorn",
  0x00ff: "ydiaeresis",
  0x0104: "Aogonek",
  0x02d8: "breve",
  0x0141: "Lstroke",
  0x013d: "Lcaron",
  0x015a: "Sacute",
  0x0160: "Scaron",
  0x015e: "Scedilla",
  0x0164: "Tcaron",
  0x0179: "Zacute",
  0x017d: "Zcaron",
  0x017b: "Zabovedot",
  0x0105: "aogonek",
  0x02db: "ogonek",
  0x0142: "lstroke",
  0x013e: "lcaron",
  0x015b: "sacute",
  0x02c7: "caron",
  0x0161: "scaron",
  0x015f: "scedilla",
  0x0165: "tcaron",
  0x017a: "zacute",
  0x02dd: "doubleacute",
  0x017e: "zcaron",
  0x017c: "zabovedot",
  0x0154: "Racute",
  0x0102: "Abreve",
  0x0139: "Lacute",
  0x0106: "Cacute",
  0x010c: "Ccaron",
  0x0118: "Eogonek",
  0x011a: "Ecaron",
  0x010e: "Dcaron",
  0x0110: "Dstroke",
  0x0143: "Nacute",
  0x0147: "Ncaron",
  0x0150: "Odoubleacute",
  0x0158: "Rcaron",
  0x016e: "Uring",
  0x0170: "Udoubleacute",
  0x0162: "Tcedilla",
  0x0155: "racute",
  0x0103: "abreve",
  0x013a: "lacute",
  0x0107: "cacute",
  0x010d: "ccaron",
  0x0119: "eogonek",
  0x011b: "ecaron",
  0x010f: "dcaron",
  0x0111: "dstroke",
  0x0144: "nacute",
  0x0148: "ncaron",
  0x0151: "odoubleacute",
  0x0159: "rcaron",
  0x016f: "uring",
  0x0171: "udoubleacute",
  0x0163: "tcedilla",
  0x02d9: "abovedot",
  0x0126: "Hstroke",
  0x0124: "Hcircumflex",
  0x0130: "Iabovedot",
  0x011e: "Gbreve",
  0x0134: "Jcircumflex",
  0x0127: "hstroke",
  0x0125: "hcircumflex",
  0x0131: "idotless",
  0x011f: "gbreve",
  0x0135: "jcircumflex",
  0x010a: "Cabovedot",
  0x0108: "Ccircumflex",
  0x0120: "Gabovedot",
  0x011c: "Gcircumflex",
  0x016c: "Ubreve",
  0x015c: "Scircumflex",
  0x010b: "cabovedot",
  0x0109: "ccircumflex",
  0x0121: "gabovedot",
  0x011d: "gcircumflex",
  0x016d: "ubreve",
  0x015d: "scircumflex",
  0x0138: "kra",
  0x0156: "Rcedilla",
  0x0128: "Itilde",
  0x013b: "Lcedilla",
  0x0112: "Emacron",
  0x0122: "Gcedilla",
  0x0166: "Tslash",
  0x0157: "rcedilla",
  0x0129: "itilde",
  0x013c: "lcedilla",
  0x0113: "emacron",
  0x0123: "gcedilla",
  0x0167: "tslash",
  0x014a: "ENG",
  0x014b: "eng",
  0x0100: "Amacron",
  0x012e: "Iogonek",
  0x0116: "Eabovedot",
  0x012a: "Imacron",
  0x0145: "Ncedilla",
  0x014c: "Omacron",
  0x0136: "Kcedilla",
  0x0172: "Uogonek",
  0x0168: "Utilde",
  0x016a: "Umacron",
  0x0101: "amacron",
  0x012f: "iogonek",
  0x0117: "eabovedot",
  0x012b: "imacron",
  0x0146: "ncedilla",
  0x014d: "omacron",
  0x0137: "kcedilla",
  0x0173: "uogonek",
  0x0169: "utilde",
  0x016b: "umacron",
  0x203e: "overline",
  0x3002: "kana_fullstop",
  0x300c: "kana_openingbracket",
  0x300d: "kana_closingbracket",
  0x3001: "kana_comma",
  0x30fb: "kana_conjunctive",
  0x30f2: "kana_WO",
  0x30a1: "kana_a",
  0x30a3: "kana_i",
  0x30a5: "kana_u",
  0x30a7: "kana_e",
  0x30a9: "kana_o",
  0x30e3: "kana_ya",
  0x30e5: "kana_yu",
  0x30e7: "kana_yo",
  0x30c3: "kana_tsu",
  0x30fc: "prolongedsound",
  0x30a2: "kana_A",
  0x30a4: "kana_I",
  0x30a6: "kana_U",
  0x30a8: "kana_E",
  0x30aa: "kana_O",
  0x30ab: "kana_KA",
  0x30ad: "kana_KI",
  0x30af: "kana_KU",
  0x30b1: "kana_KE",
  0x30b3: "kana_KO",
  0x30b5: "kana_SA",
  0x30b7: "kana_SHI",
  0x30b9: "kana_SU",
  0x30bb: "kana_SE",
  0x30bd: "kana_SO",
  0x30bf: "kana_TA",
  0x30c1: "kana_CHI",
  0x30c4: "kana_TSU",
  0x30c6: "kana_TE",
  0x30c8: "kana_TO",
  0x30ca: "kana_NA",
  0x30cb: "kana_NI",
  0x30cc: "kana_NU",
  0x30cd: "kana_NE",
  0x30ce: "kana_NO",
  0x30cf: "kana_HA",
  0x30d2: "kana_HI",
  0x30d5: "kana_FU",
  0x30d8: "kana_HE",
  0x30db: "kana_HO",
  0x30de: "kana_MA",
  0x30df: "kana_MI",
  0x30e0: "kana_MU",
  0x30e1: "kana_ME",
  0x30e2: "kana_MO",
  0x30e4: "kana_YA",
  0x30e6: "kana_YU",
  0x30e8: "kana_YO",
  0x30e9: "kana_RA",
  0x30ea: "kana_RI",
  0x30eb: "kana_RU",
  0x30ec: "kana_RE",
  0x30ed: "kana_RO",
  0x30ef: "kana_WA",
  0x30f3: "kana_N",
  0x309b: "voicedsound",
  0x309c: "semivoicedsound",
  0x060c: "Arabic_comma",
  0x061b: "Arabic_semicolon",
  0x061f: "Arabic_question_mark",
  0x0621: "Arabic_hamza",
  0x0622: "Arabic_maddaonalef",
  0x0623: "Arabic_hamzaonalef",
  0x0624: "Arabic_hamzaonwaw",
  0x0625: "Arabic_hamzaunderalef",
  0x0626: "Arabic_hamzaonyeh",
  0x0627: "Arabic_alef",
  0x0628: "Arabic_beh",
  0x0629: "Arabic_tehmarbuta",
  0x062a: "Arabic_teh",
  0x062b: "Arabic_theh",
  0x062c: "Arabic_jeem",
  0x062d: "Arabic_hah",
  0x062e: "Arabic_khah",
  0x062f: "Arabic_dal",
  0x0630: "Arabic_thal",
  0x0631: "Arabic_ra",
  0x0632: "Arabic_zain",
  0x0633: "Arabic_seen",
  0x0634: "Arabic_sheen",
  0x0635: "Arabic_sad",
  0x0636: "Arabic_dad",
  0x0637: "Arabic_tah",
  0x0638: "Arabic_zah",
  0x0639: "Arabic_ain",
  0x063a: "Arabic_ghain",
  0x0640: "Arabic_tatweel",
  0x0641: "Arabic_feh",
  0x0642: "Arabic_qaf",
  0x0643: "Arabic_kaf",
  0x0644: "Arabic_lam",
  0x0645: "Arabic_meem",
  0x0646: "Arabic_noon",
  0x0647: "Arabic_ha",
  0x0648: "Arabic_waw",
  0x0649: "Arabic_alefmaksura",
  0x064a: "Arabic_yeh",
  0x064b: "Arabic_fathatan",
  0x064c: "Arabic_dammatan",
  0x064d: "Arabic_kasratan",
  0x064e: "Arabic_fatha",
  0x064f: "Arabic_damma",
  0x0650: "Arabic_kasra",
  0x0651: "Arabic_shadda",
  0x0652: "Arabic_sukun",
  0x0452: "Serbian_dje",
  0x0453: "Macedonia_gje",
  0x0451: "Cyrillic_io",
  0x0454: "Ukrainian_ie",
  0x0455: "Macedonia_dse",
  0x0456: "Ukrainian_i",
  0x0457: "Ukrainian_yi",
  0x0458: "Cyrillic_je",
  0x0459: "Cyrillic_lje",
  0x045a: "Cyrillic_nje",
  0x045b: "Serbian_tshe",
  0x045c: "Macedonia_kje",
  0x045e: "Byelorussian_shortu",
  0x045f: "Cyrillic_dzhe",
  0x2116: "numerosign",
  0x0402: "Serbian_DJE",
  0x0403: "Macedonia_GJE",
  0x0401: "Cyrillic_IO",
  0x0404: "Ukrainian_IE",
  0x0405: "Macedonia_DSE",
  0x0406: "Ukrainian_I",
  0x0407: "Ukrainian_YI",
  0x0408: "Cyrillic_JE",
  0x0409: "Cyrillic_LJE",
  0x040a: "Cyrillic_NJE",
  0x040b: "Serbian_TSHE",
  0x040c: "Macedonia_KJE",
  0x040e: "Byelorussian_SHORTU",
  0x040f: "Cyrillic_DZHE",
  0x044e: "Cyrillic_yu",
  0x0430: "Cyrillic_a",
  0x0431: "Cyrillic_be",
  0x0446: "Cyrillic_tse",
  0x0434: "Cyrillic_de",
  0x0435: "Cyrillic_ie",
  0x0444: "Cyrillic_ef",
  0x0433: "Cyrillic_ghe",
  0x0445: "Cyrillic_ha",
  0x0438: "Cyrillic_i",
  0x0439: "Cyrillic_shorti",
  0x043a: "Cyrillic_ka",
  0x043b: "Cyrillic_el",
  0x043c: "Cyrillic_em",
  0x043d: "Cyrillic_en",
  0x043e: "Cyrillic_o",
  0x043f: "Cyrillic_pe",
  0x044f: "Cyrillic_ya",
  0x0440: "Cyrillic_er",
  0x0441: "Cyrillic_es",
  0x0442: "Cyrillic_te",
  0x0443: "Cyrillic_u",
  0x0436: "Cyrillic_zhe",
  0x0432: "Cyrillic_ve",
  0x044c: "Cyrillic_softsign",
  0x044b: "Cyrillic_yeru",
  0x0437: "Cyrillic_ze",
  0x0448: "Cyrillic_sha",
  0x044d: "Cyrillic_e",
  0x0449: "Cyrillic_shcha",
  0x0447: "Cyrillic_che",
  0x044a: "Cyrillic_hardsign",
  0x042e: "Cyrillic_YU",
  0x0410: "Cyrillic_A",
  0x0411: "Cyrillic_BE",
  0x0426: "Cyrillic_TSE",
  0x0414: "Cyrillic_DE",
  0x0415: "Cyrillic_IE",
  0x0424: "Cyrillic_EF",
  0x0413: "Cyrillic_GHE",
  0x0425: "Cyrillic_HA",
  0x0418: "Cyrillic_I",
  0x0419: "Cyrillic_SHORTI",
  0x041a: "Cyrillic_KA",
  0x041b: "Cyrillic_EL",
  0x041c: "Cyrillic_EM",
  0x041d: "Cyrillic_EN",
  0x041e: "Cyrillic_O",
  0x041f: "Cyrillic_PE",
  0x042f: "Cyrillic_YA",
  0x0420: "Cyrillic_ER",
  0x0421: "Cyrillic_ES",
  0x0422: "Cyrillic_TE",
  0x0423: "Cyrillic_U",
  0x0416: "Cyrillic_ZHE",
  0x0412: "Cyrillic_VE",
  0x042c: "Cyrillic_SOFTSIGN",
  0x042b: "Cyrillic_YERU",
  0x0417: "Cyrillic_ZE",
  0x0428: "Cyrillic_SHA",
  0x042d: "Cyrillic_E",
  0x0429: "Cyrillic_SHCHA",
  0x0427: "Cyrillic_CHE",
  0x042a: "Cyrillic_HARDSIGN",
  0x0386: "Greek_ALPHAaccent",
  0x0388: "Greek_EPSILONaccent",
  0x0389: "Greek_ETAaccent",
  0x038a: "Greek_IOTAaccent",
  0x03aa: "Greek_IOTAdiaeresis",
  0x038c: "Greek_OMICRONaccent",
  0x038e: "Greek_UPSILONaccent",
  0x03ab: "Greek_UPSILONdieresis",
  0x038f: "Greek_OMEGAaccent",
  0x0385: "Greek_accentdieresis",
  0x2015: "Greek_horizbar",
  0x03ac: "Greek_alphaaccent",
  0x03ad: "Greek_epsilonaccent",
  0x03ae: "Greek_etaaccent",
  0x03af: "Greek_iotaaccent",
  0x03ca: "Greek_iotadieresis",
  0x0390: "Greek_iotaaccentdieresis",
  0x03cc: "Greek_omicronaccent",
  0x03cd: "Greek_upsilonaccent",
  0x03cb: "Greek_upsilondieresis",
  0x03b0: "Greek_upsilonaccentdieresis",
  0x03ce: "Greek_omegaaccent",
  0x0391: "Greek_ALPHA",
  0x0392: "Greek_BETA",
  0x0393: "Greek_GAMMA",
  0x0394: "Greek_DELTA",
  0x0395: "Greek_EPSILON",
  0x0396: "Greek_ZETA",
  0x0397: "Greek_ETA",
  0x0398: "Greek_THETA",
  0x0399: "Greek_IOTA",
  0x039a: "Greek_KAPPA",
  0x039b: "Greek_LAMBDA",
  0x039c: "Greek_MU",
  0x039d: "Greek_NU",
  0x039e: "Greek_XI",
  0x039f: "Greek_OMICRON",
  0x03a0: "Greek_PI",
  0x03a1: "Greek_RHO",
  0x03a3: "Greek_SIGMA",
  0x03a4: "Greek_TAU",
  0x03a5: "Greek_UPSILON",
  0x03a6: "Greek_PHI",
  0x03a7: "Greek_CHI",
  0x03a8: "Greek_PSI",
  0x03a9: "Greek_OMEGA",
  0x03b1: "Greek_alpha",
  0x03b2: "Greek_beta",
  0x03b3: "Greek_gamma",
  0x03b4: "Greek_delta",
  0x03b5: "Greek_epsilon",
  0x03b6: "Greek_zeta",
  0x03b7: "Greek_eta",
  0x03b8: "Greek_theta",
  0x03b9: "Greek_iota",
  0x03ba: "Greek_kappa",
  0x03bb: "Greek_lambda",
  0x03bc: "Greek_mu",
  0x03bd: "Greek_nu",
  0x03be: "Greek_xi",
  0x03bf: "Greek_omicron",
  0x03c0: "Greek_pi",
  0x03c1: "Greek_rho",
  0x03c3: "Greek_sigma",
  0x03c2: "Greek_finalsmallsigma",
  0x03c4: "Greek_tau",
  0x03c5: "Greek_upsilon",
  0x03c6: "Greek_phi",
  0x03c7: "Greek_chi",
  0x03c8: "Greek_psi",
  0x03c9: "Greek_omega",
  0x23b7: "leftradical",
  0x2320: "topintegral",
  0x2321: "botintegral",
  0x23a1: "topleftsqbracket",
  0x23a3: "botleftsqbracket",
  0x23a4: "toprightsqbracket",
  0x23a6: "botrightsqbracket",
  0x239b: "topleftparens",
  0x239d: "botleftparens",
  0x239e: "toprightparens",
  0x23a0: "botrightparens",
  0x23a8: "leftmiddlecurlybrace",
  0x23ac: "rightmiddlecurlybrace",
  0x2264: "lessthanequal",
  0x2260: "notequal",
  0x2265: "greaterthanequal",
  0x222b: "integral",
  0x2234: "therefore",
  0x221d: "variation",
  0x221e: "infinity",
  0x2207: "nabla",
  0x223c: "approximate",
  0x2243: "similarequal",
  0x21d4: "ifonlyif",
  0x21d2: "implies",
  0x2261: "identical",
  0x221a: "radical",
  0x2282: "includedin",
  0x2283: "includes",
  0x2229: "intersection",
  0x222a: "union",
  0x2227: "logicaland",
  0x2228: "logicalor",
  0x2202: "partialderivative",
  0x0192: "function",
  0x2190: "leftarrow",
  0x2191: "uparrow",
  0x2192: "rightarrow",
  0x2193: "downarrow",
  0x25c6: "soliddiamond",
  0x2592: "checkerboard",
  0x2409: "ht",
  0x240c: "ff",
  0x240d: "cr",
  0x240a: "lf",
  0x2424: "nl",
  0x240b: "vt",
  0x2518: "lowrightcorner",
  0x2510: "uprightcorner",
  0x250c: "upleftcorner",
  0x2514: "lowleftcorner",
  0x253c: "crossinglines",
  0x23ba: "horizlinescan1",
  0x23bb: "horizlinescan3",
  0x2500: "horizlinescan5",
  0x23bc: "horizlinescan7",
  0x23bd: "horizlinescan9",
  0x251c: "leftt",
  0x2524: "rightt",
  0x2534: "bott",
  0x252c: "topt",
  0x2502: "vertbar",
  0x2003: "emspace",
  0x2002: "enspace",
  0x2004: "em3space",
  0x2005: "em4space",
  0x2007: "digitspace",
  0x2008: "punctspace",
  0x2009: "thinspace",
  0x200a: "hairspace",
  0x2014: "emdash",
  0x2013: "endash",
  0x2423: "signifblank",
  0x2026: "ellipsis",
  0x2025: "doubbaselinedot",
  0x2153: "onethird",
  0x2154: "twothirds",
  0x2155: "onefifth",
  0x2156: "twofifths",
  0x2157: "threefifths",
  0x2158: "fourfifths",
  0x2159: "onesixth",
  0x215a: "fivesixths",
  0x2105: "careof",
  0x2012: "figdash",
  0x27e8: "leftanglebracket",
  0x27e9: "rightanglebracket",
  0x215b: "oneeighth",
  0x215c: "threeeighths",
  0x215d: "fiveeighths",
  0x215e: "seveneighths",
  0x2122: "trademark",
  0x2613: "signaturemark",
  0x25c1: "leftopentriangle",
  0x25b7: "rightopentriangle",
  0x25af: "emopenrectangle",
  0x2018: "leftsinglequotemark",
  0x2019: "rightsinglequotemark",
  0x201c: "leftdoublequotemark",
  0x201d: "rightdoublequotemark",
  0x211e: "prescription",
  0x2032: "minutes",
  0x2033: "seconds",
  0x271d: "latincross",
  0x25ac: "filledrectbullet",
  0x25c0: "filledlefttribullet",
  0x25b6: "filledrighttribullet",
  0x25cf: "emfilledcircle",
  0x25ae: "emfilledrect",
  0x25e6: "enopencircbullet",
  0x25ab: "enopensquarebullet",
  0x25ad: "openrectbullet",
  0x25b3: "opentribulletup",
  0x25bd: "opentribulletdown",
  0x2606: "openstar",
  0x2022: "enfilledcircbullet",
  0x25aa: "enfilledsqbullet",
  0x25b2: "filledtribulletup",
  0x25bc: "filledtribulletdown",
  0x261c: "leftpointer",
  0x261e: "rightpointer",
  0x2663: "club",
  0x2666: "diamond",
  0x2665: "heart",
  0x2720: "maltesecross",
  0x2020: "dagger",
  0x2021: "doubledagger",
  0x2713: "checkmark",
  0x2717: "ballotcross",
  0x266f: "musicalsharp",
  0x266d: "musicalflat",
  0x2642: "malesymbol",
  0x2640: "femalesymbol",
  0x260e: "telephone",
  0x2315: "telephonerecorder",
  0x2117: "phonographcopyright",
  0x2038: "caret",
  0x201a: "singlelowquotemark",
  0x201e: "doublelowquotemark",
  0x22a5: "downtack",
  0x230a: "downstile",
  0x2218: "jot",
  0x2395: "quad",
  0x22a4: "uptack",
  0x25cb: "circle",
  0x2308: "upstile",
  0x22a2: "lefttack",
  0x22a3: "righttack",
  0x2017: "hebrew_doublelowline",
  0x05d0: "hebrew_aleph",
  0x05d1: "hebrew_beth",
  0x05d2: "hebrew_gimmel",
  0x05d3: "hebrew_daleth",
  0x05d4: "hebrew_he",
  0x05d5: "hebrew_waw",
  0x05d6: "hebrew_zayin",
  0x05d7: "hebrew_het",
  0x05d8: "hebrew_teth",
  0x05d9: "hebrew_yod",
  0x05da: "hebrew_finalkaph",
  0x05db: "hebrew_kaph",
  0x05dc: "hebrew_lamed",
  0x05dd: "hebrew_finalmem",
  0x05de: "hebrew_mem",
  0x05df: "hebrew_finalnun",
  0x05e0: "hebrew_nun",
  0x05e1: "hebrew_samekh",
  0x05e2: "hebrew_ayin",
  0x05e3: "hebrew_finalpe",
  0x05e4: "hebrew_pe",
  0x05e5: "hebrew_finalzadi",
  0x05e6: "hebrew_zadi",
  0x05e7: "hebrew_qoph",
  0x05e8: "hebrew_resh",
  0x05e9: "hebrew_shin",
  0x05ea: "hebrew_taw",
  0x0e01: "Thai_kokai",
  0x0e02: "Thai_khokhai",
  0x0e03: "Thai_khokhuat",
  0x0e04: "Thai_khokhwai",
  0x0e05: "Thai_khokhon",
  0x0e06: "Thai_khorakhang",
  0x0e07: "Thai_ngongu",
  0x0e08: "Thai_chochan",
  0x0e09: "Thai_choching",
  0x0e0a: "Thai_chochang",
  0x0e0b: "Thai_soso",
  0x0e0c: "Thai_chochoe",
  0x0e0d: "Thai_yoying",
  0x0e0e: "Thai_dochada",
  0x0e0f: "Thai_topatak",
  0x0e10: "Thai_thothan",
  0x0e11: "Thai_thonangmontho",
  0x0e12: "Thai_thophuthao",
  0x0e13: "Thai_nonen",
  0x0e14: "Thai_dodek",
  0x0e15: "Thai_totao",
  0x0e16: "Thai_thothung",
  0x0e17: "Thai_thothahan",
  0x0e18: "Thai_thothong",
  0x0e19: "Thai_nonu",
  0x0e1a: "Thai_bobaimai",
  0x0e1b: "Thai_popla",
  0x0e1c: "Thai_phophung",
  0x0e1d: "Thai_fofa",
  0x0e1e: "Thai_phophan",
  0x0e1f: "Thai_fofan",
  0x0e20: "Thai_phosamphao",
  0x0e21: "Thai_moma",
  0x0e22: "Thai_yoyak",
  0x0e23: "Thai_rorua",
  0x0e24: "Thai_ru",
  0x0e25: "Thai_loling",
  0x0e26: "Thai_lu",
  0x0e27: "Thai_wowaen",
  0x0e28: "Thai_sosala",
  0x0e29: "Thai_sorusi",
  0x0e2a: "Thai_sosua",
  0x0e2b: "Thai_hohip",
  0x0e2c: "Thai_lochula",
  0x0e2d: "Thai_oang",
  0x0e2e: "Thai_honokhuk",
  0x0e2f: "Thai_paiyannoi",
  0x0e30: "Thai_saraa",
  0x0e31: "Thai_maihanakat",
  0x0e32: "Thai_saraaa",
  0x0e33: "Thai_saraam",
  0x0e34: "Thai_sarai",
  0x0e35: "Thai_saraii",
  0x0e36: "Thai_saraue",
  0x0e37: "Thai_sarauee",
  0x0e38: "Thai_sarau",
  0x0e39: "Thai_sarauu",
  0x0e3a: "Thai_phinthu",
  0x0e3f: "Thai_baht",
  0x0e40: "Thai_sarae",
  0x0e41: "Thai_saraae",
  0x0e42: "Thai_sarao",
  0x0e43: "Thai_saraaimaimuan",
  0x0e44: "Thai_saraaimaimalai",
  0x0e45: "Thai_lakkhangyao",
  0x0e46: "Thai_maiyamok",
  0x0e47: "Thai_maitaikhu",
  0x0e48: "Thai_maiek",
  0x0e49: "Thai_maitho",
  0x0e4a: "Thai_maitri",
  0x0e4b: "Thai_maichattawa",
  0x0e4c: "Thai_thanthakhat",
  0x0e4d: "Thai_nikhahit",
  0x0e50: "Thai_leksun",
  0x0e51: "Thai_leknung",
  0x0e52: "Thai_leksong",
  0x0e53: "Thai_leksam",
  0x0e54: "Thai_leksi",
  0x0e55: "Thai_lekha",
  0x0e56: "Thai_lekhok",
  0x0e57: "Thai_lekchet",
  0x0e58: "Thai_lekpaet",
  0x0e59: "Thai_lekkao",
  0x3131: "Hangul_Kiyeog",
  0x3132: "Hangul_SsangKiyeog",
  0x3133: "Hangul_KiyeogSios",
  0x3134: "Hangul_Nieun",
  0x3135: "Hangul_NieunJieuj",
  0x3136: "Hangul_NieunHieuh",
  0x3137: "Hangul_Dikeud",
  0x3138: "Hangul_SsangDikeud",
  0x3139: "Hangul_Rieul",
  0x313a: "Hangul_RieulKiyeog",
  0x313b: "Hangul_RieulMieum",
  0x313c: "Hangul_RieulPieub",
  0x313d: "Hangul_RieulSios",
  0x313e: "Hangul_RieulTieut",
  0x313f: "Hangul_RieulPhieuf",
  0x3140: "Hangul_RieulHieuh",
  0x3141: "Hangul_Mieum",
  0x3142: "Hangul_Pieub",
  0x3143: "Hangul_SsangPieub",
  0x3144: "Hangul_PieubSios",
  0x3145: "Hangul_Sios",
  0x3146: "Hangul_SsangSios",
  0x3147: "Hangul_Ieung",
  0x3148: "Hangul_Jieuj",
  0x3149: "Hangul_SsangJieuj",
  0x314a: "Hangul_Cieuc",
  0x314b: "Hangul_Khieuq",
  0x314c: "Hangul_Tieut",
  0x314d: "Hangul_Phieuf",
  0x314e: "Hangul_Hieuh",
  0x314f: "Hangul_A",
  0x3150: "Hangul_AE",
  0x3151: "Hangul_YA",
  0x3152: "Hangul_YAE",
  0x3153: "Hangul_EO",
  0x3154: "Hangul_E",
  0x3155: "Hangul_YEO",
  0x3156: "Hangul_YE",
  0x3157: "Hangul_O",
  0x3158: "Hangul_WA",
  0x3159: "Hangul_WAE",
  0x315a: "Hangul_OE",
  0x315b: "Hangul_YO",
  0x315c: "Hangul_U",
  0x315d: "Hangul_WEO",
  0x315e: "Hangul_WE",
  0x315f: "Hangul_WI",
  0x3160: "Hangul_YU",
  0x3161: "Hangul_EU",
  0x3162: "Hangul_YI",
  0x3163: "Hangul_I",
  0x11a8: "Hangul_J_Kiyeog",
  0x11a9: "Hangul_J_SsangKiyeog",
  0x11aa: "Hangul_J_KiyeogSios",
  0x11ab: "Hangul_J_Nieun",
  0x11ac: "Hangul_J_NieunJieuj",
  0x11ad: "Hangul_J_NieunHieuh",
  0x11ae: "Hangul_J_Dikeud",
  0x11af: "Hangul_J_Rieul",
  0x11b0: "Hangul_J_RieulKiyeog",
  0x11b1: "Hangul_J_RieulMieum",
  0x11b2: "Hangul_J_RieulPieub",
  0x11b3: "Hangul_J_RieulSios",
  0x11b4: "Hangul_J_RieulTieut",
  0x11b5: "Hangul_J_RieulPhieuf",
  0x11b6: "Hangul_J_RieulHieuh",
  0x11b7: "Hangul_J_Mieum",
  0x11b8: "Hangul_J_Pieub",
  0x11b9: "Hangul_J_PieubSios",
  0x11ba: "Hangul_J_Sios",
  0x11bb: "Hangul_J_SsangSios",
  0x11bc: "Hangul_J_Ieung",
  0x11bd: "Hangul_J_Jieuj",
  0x11be: "Hangul_J_Cieuc",
  0x11bf: "Hangul_J_Khieuq",
  0x11c0: "Hangul_J_Tieut",
  0x11c1: "Hangul_J_Phieuf",
  0x11c2: "Hangul_J_Hieuh",
  0x316d: "Hangul_RieulYeorinHieuh",
  0x3171: "Hangul_SunkyeongeumMieum",
  0x3178: "Hangul_SunkyeongeumPieub",
  0x317f: "Hangul_PanSios",
  0x3181: "Hangul_KkogjiDalrinIeung",
  0x3184: "Hangul_SunkyeongeumPhieuf",
  0x3186: "Hangul_YeorinHieuh",
  0x318d: "Hangul_AraeA",
  0x318e: "Hangul_AraeAE",
  0x11eb: "Hangul_J_PanSios",
  0x11f0: "Hangul_J_KkogjiDalrinIeung",
  0x11f9: "Hangul_J_YeorinHieuh",
  0x0152: "OE",
  0x0153: "oe",
  0x0178: "Ydiaeresis",
  0x20a0: "EcuSign",
  0x20a1: "ColonSign",
  0x20a2: "CruzeiroSign",
  0x20a3: "FFrancSign",
  0x20a4: "LiraSign",
  0x20a5: "MillSign",
  0x20a6: "NairaSign",
  0x20a7: "PesetaSign",
  0x20a8: "RupeeSign",
  0x20a9: "WonSign",
  0x20aa: "NewSheqelSign",
  0x20ab: "DongSign",
  0x20ac: "EuroSign",
  0x0300: "dead_grave",
  0x0301: "dead_acute",
  0x0302: "dead_circumflex",
  0x0303: "dead_tilde",
  0x0304: "dead_macron",
  0x0306: "dead_breve",
  0x0307: "dead_abovedot",
  0x0308: "dead_diaeresis",
  0x030a: "dead_abovering",
  0x030b: "dead_doubleacute",
  0x030c: "dead_caron",
  0x0327: "dead_cedilla",
  0x0328: "dead_ogonek",
  0x0345: "dead_iota",
  0x3099: "dead_voiced_sound",
  0x309a: "dead_semivoiced_sound",
  0x0008: "BackSpace",
  0x0009: "Tab",
  0x000a: "Linefeed",
  0x000b: "Clear",
  0x000d: "Return",
  0x0013: "Pause",
  0x0014: "Scroll_Lock",
  0x0015: "Sys_Req",
  0x001b: "Escape",
  0x0491: "Ukrainian_ghe_with_upturn",
  0x0490: "Ukrainian_GHE_WITH_UPTURN",
  0x0587: "Armenian_ligature_ew",
  0x0589: "Armenian_verjaket",
  0x055d: "Armenian_but",
  0x058a: "Armenian_yentamna",
  0x055c: "Armenian_amanak",
  0x055b: "Armenian_shesht",
  0x055e: "Armenian_paruyk",
  0x0531: "Armenian_AYB",
  0x0561: "Armenian_ayb",
  0x0532: "Armenian_BEN",
  0x0562: "Armenian_ben",
  0x0533: "Armenian_GIM",
  0x0563: "Armenian_gim",
  0x0534: "Armenian_DA",
  0x0564: "Armenian_da",
  0x0535: "Armenian_YECH",
  0x0565: "Armenian_yech",
  0x0536: "Armenian_ZA",
  0x0566: "Armenian_za",
  0x0537: "Armenian_E",
  0x0567: "Armenian_e",
  0x0538: "Armenian_AT",
  0x0568: "Armenian_at",
  0x0539: "Armenian_TO",
  0x0569: "Armenian_to",
  0x053a: "Armenian_ZHE",
  0x056a: "Armenian_zhe",
  0x053b: "Armenian_INI",
  0x056b: "Armenian_ini",
  0x053c: "Armenian_LYUN",
  0x056c: "Armenian_lyun",
  0x053d: "Armenian_KHE",
  0x056d: "Armenian_khe",
  0x053e: "Armenian_TSA",
  0x056e: "Armenian_tsa",
  0x053f: "Armenian_KEN",
  0x056f: "Armenian_ken",
  0x0540: "Armenian_HO",
  0x0570: "Armenian_ho",
  0x0541: "Armenian_DZA",
  0x0571: "Armenian_dza",
  0x0542: "Armenian_GHAT",
  0x0572: "Armenian_ghat",
  0x0543: "Armenian_TCHE",
  0x0573: "Armenian_tche",
  0x0544: "Armenian_MEN",
  0x0574: "Armenian_men",
  0x0545: "Armenian_HI",
  0x0575: "Armenian_hi",
  0x0546: "Armenian_NU",
  0x0576: "Armenian_nu",
  0x0547: "Armenian_SHA",
  0x0577: "Armenian_sha",
  0x0548: "Armenian_VO",
  0x0578: "Armenian_vo",
  0x0549: "Armenian_CHA",
  0x0579: "Armenian_cha",
  0x054a: "Armenian_PE",
  0x057a: "Armenian_pe",
  0x054b: "Armenian_JE",
  0x057b: "Armenian_je",
  0x054c: "Armenian_RA",
  0x057c: "Armenian_ra",
  0x054d: "Armenian_SE",
  0x057d: "Armenian_se",
  0x054e: "Armenian_VEV",
  0x057e: "Armenian_vev",
  0x054f: "Armenian_TYUN",
  0x057f: "Armenian_tyun",
  0x0550: "Armenian_RE",
  0x0580: "Armenian_re",
  0x0551: "Armenian_TSO",
  0x0581: "Armenian_tso",
  0x0552: "Armenian_VYUN",
  0x0582: "Armenian_vyun",
  0x0553: "Armenian_PYUR",
  0x0583: "Armenian_pyur",
  0x0554: "Armenian_KE",
  0x0584: "Armenian_ke",
  0x0555: "Armenian_O",
  0x0585: "Armenian_o",
  0x0556: "Armenian_FE",
  0x0586: "Armenian_fe",
  0x055a: "Armenian_apostrophe",
  0x10d0: "Georgian_an",
  0x10d1: "Georgian_ban",
  0x10d2: "Georgian_gan",
  0x10d3: "Georgian_don",
  0x10d4: "Georgian_en",
  0x10d5: "Georgian_vin",
  0x10d6: "Georgian_zen",
  0x10d7: "Georgian_tan",
  0x10d8: "Georgian_in",
  0x10d9: "Georgian_kan",
  0x10da: "Georgian_las",
  0x10db: "Georgian_man",
  0x10dc: "Georgian_nar",
  0x10dd: "Georgian_on",
  0x10de: "Georgian_par",
  0x10df: "Georgian_zhar",
  0x10e0: "Georgian_rae",
  0x10e1: "Georgian_san",
  0x10e2: "Georgian_tar",
  0x10e3: "Georgian_un",
  0x10e4: "Georgian_phar",
  0x10e5: "Georgian_khar",
  0x10e6: "Georgian_ghan",
  0x10e7: "Georgian_qar",
  0x10e8: "Georgian_shin",
  0x10e9: "Georgian_chin",
  0x10ea: "Georgian_can",
  0x10eb: "Georgian_jil",
  0x10ec: "Georgian_cil",
  0x10ed: "Georgian_char",
  0x10ee: "Georgian_xan",
  0x10ef: "Georgian_jhan",
  0x10f0: "Georgian_hae",
  0x10f1: "Georgian_he",
  0x10f2: "Georgian_hie",
  0x10f3: "Georgian_we",
  0x10f4: "Georgian_har",
  0x10f5: "Georgian_hoe",
  0x10f6: "Georgian_fi",
  0x1e02: "Babovedot",
  0x1e03: "babovedot",
  0x1e0a: "Dabovedot",
  0x1e80: "Wgrave",
  0x1e82: "Wacute",
  0x1e0b: "dabovedot",
  0x1ef2: "Ygrave",
  0x1e1e: "Fabovedot",
  0x1e1f: "fabovedot",
  0x1e40: "Mabovedot",
  0x1e41: "mabovedot",
  0x1e56: "Pabovedot",
  0x1e81: "wgrave",
  0x1e57: "pabovedot",
  0x1e83: "wacute",
  0x1e60: "Sabovedot",
  0x1ef3: "ygrave",
  0x1e84: "Wdiaeresis",
  0x1e85: "wdiaeresis",
  0x1e61: "sabovedot",
  0x0174: "Wcircumflex",
  0x1e6a: "Tabovedot",
  0x0176: "Ycircumflex",
  0x0175: "wcircumflex",
  0x1e6b: "tabovedot",
  0x0177: "ycircumflex",
  0x06f0: "Farsi_0",
  0x06f1: "Farsi_1",
  0x06f2: "Farsi_2",
  0x06f3: "Farsi_3",
  0x06f4: "Farsi_4",
  0x06f5: "Farsi_5",
  0x06f6: "Farsi_6",
  0x06f7: "Farsi_7",
  0x06f8: "Farsi_8",
  0x06f9: "Farsi_9",
  0x066a: "Arabic_percent",
  0x0670: "Arabic_superscript_alef",
  0x0679: "Arabic_tteh",
  0x067e: "Arabic_peh",
  0x0686: "Arabic_tcheh",
  0x0688: "Arabic_ddal",
  0x0691: "Arabic_rreh",
  0x06d4: "Arabic_fullstop",
  0x0660: "Arabic_0",
  0x0661: "Arabic_1",
  0x0662: "Arabic_2",
  0x0663: "Arabic_3",
  0x0664: "Arabic_4",
  0x0665: "Arabic_5",
  0x0666: "Arabic_6",
  0x0667: "Arabic_7",
  0x0668: "Arabic_8",
  0x0669: "Arabic_9",
  0x0653: "Arabic_madda_above",
  0x0654: "Arabic_hamza_above",
  0x0655: "Arabic_hamza_below",
  0x0698: "Arabic_jeh",
  0x06a4: "Arabic_veh",
  0x06a9: "Arabic_keheh",
  0x06af: "Arabic_gaf",
  0x06ba: "Arabic_noon_ghunna",
  0x06be: "Arabic_heh_doachashmee",
  0x06cc: "Farsi_yeh",
  0x06d2: "Arabic_yeh_baree",
  0x06c1: "Arabic_heh_goal",
  0x0492: "Cyrillic_GHE_bar",
  0x0496: "Cyrillic_ZHE_descender",
  0x049a: "Cyrillic_KA_descender",
  0x049c: "Cyrillic_KA_vertstroke",
  0x04a2: "Cyrillic_EN_descender",
  0x04ae: "Cyrillic_U_straight",
  0x04b0: "Cyrillic_U_straight_bar",
  0x04b2: "Cyrillic_HA_descender",
  0x04b6: "Cyrillic_CHE_descender",
  0x04b8: "Cyrillic_CHE_vertstroke",
  0x04ba: "Cyrillic_SHHA",
  0x04d8: "Cyrillic_SCHWA",
  0x04e2: "Cyrillic_I_macron",
  0x04e8: "Cyrillic_O_bar",
  0x04ee: "Cyrillic_U_macron",
  0x0493: "Cyrillic_ghe_bar",
  0x0497: "Cyrillic_zhe_descender",
  0x049b: "Cyrillic_ka_descender",
  0x049d: "Cyrillic_ka_vertstroke",
  0x04a3: "Cyrillic_en_descender",
  0x04af: "Cyrillic_u_straight",
  0x04b1: "Cyrillic_u_straight_bar",
  0x04b3: "Cyrillic_ha_descender",
  0x04b7: "Cyrillic_che_descender",
  0x04b9: "Cyrillic_che_vertstroke",
  0x04bb: "Cyrillic_shha",
  0x04d9: "Cyrillic_schwa",
  0x04e3: "Cyrillic_i_macron",
  0x04e9: "Cyrillic_o_bar",
  0x04ef: "Cyrillic_u_macron",
  0x1e8a: "Xabovedot",
  0x012c: "Ibreve",
  0x01b5: "Zstroke",
  0x01e6: "Gcaron",
  0x019f: "Obarred",
  0x1e8b: "xabovedot",
  0x012d: "ibreve",
  0x01b6: "zstroke",
  0x01e7: "gcaron",
  0x01d2: "ocaron",
  0x0275: "obarred",
  0x018f: "SCHWA",
  0x0259: "schwa",
  0x1e36: "Lbelowdot",
  0x1e37: "lbelowdot",
  0x1ea0: "Abelowdot",
  0x1ea1: "abelowdot",
  0x1ea2: "Ahook",
  0x1ea3: "ahook",
  0x1ea4: "Acircumflexacute",
  0x1ea5: "acircumflexacute",
  0x1ea6: "Acircumflexgrave",
  0x1ea7: "acircumflexgrave",
  0x1ea8: "Acircumflexhook",
  0x1ea9: "acircumflexhook",
  0x1eaa: "Acircumflextilde",
  0x1eab: "acircumflextilde",
  0x1eac: "Acircumflexbelowdot",
  0x1ead: "acircumflexbelowdot",
  0x1eae: "Abreveacute",
  0x1eaf: "abreveacute",
  0x1eb0: "Abrevegrave",
  0x1eb1: "abrevegrave",
  0x1eb2: "Abrevehook",
  0x1eb3: "abrevehook",
  0x1eb4: "Abrevetilde",
  0x1eb5: "abrevetilde",
  0x1eb6: "Abrevebelowdot",
  0x1eb7: "abrevebelowdot",
  0x1eb8: "Ebelowdot",
  0x1eb9: "ebelowdot",
  0x1eba: "Ehook",
  0x1ebb: "ehook",
  0x1ebc: "Etilde",
  0x1ebd: "etilde",
  0x1ebe: "Ecircumflexacute",
  0x1ebf: "ecircumflexacute",
  0x1ec0: "Ecircumflexgrave",
  0x1ec1: "ecircumflexgrave",
  0x1ec2: "Ecircumflexhook",
  0x1ec3: "ecircumflexhook",
  0x1ec4: "Ecircumflextilde",
  0x1ec5: "ecircumflextilde",
  0x1ec6: "Ecircumflexbelowdot",
  0x1ec7: "ecircumflexbelowdot",
  0x1ec8: "Ihook",
  0x1ec9: "ihook",
  0x1eca: "Ibelowdot",
  0x1ecb: "ibelowdot",
  0x1ecc: "Obelowdot",
  0x1ecd: "obelowdot",
  0x1ece: "Ohook",
  0x1ecf: "ohook",
  0x1ed0: "Ocircumflexacute",
  0x1ed1: "ocircumflexacute",
  0x1ed2: "Ocircumflexgrave",
  0x1ed3: "ocircumflexgrave",
  0x1ed4: "Ocircumflexhook",
  0x1ed5: "ocircumflexhook",
  0x1ed6: "Ocircumflextilde",
  0x1ed7: "ocircumflextilde",
  0x1ed8: "Ocircumflexbelowdot",
  0x1ed9: "ocircumflexbelowdot",
  0x1eda: "Ohornacute",
  0x1edb: "ohornacute",
  0x1edc: "Ohorngrave",
  0x1edd: "ohorngrave",
  0x1ede: "Ohornhook",
  0x1edf: "ohornhook",
  0x1ee0: "Ohorntilde",
  0x1ee1: "ohorntilde",
  0x1ee2: "Ohornbelowdot",
  0x1ee3: "ohornbelowdot",
  0x1ee4: "Ubelowdot",
  0x1ee5: "ubelowdot",
  0x1ee6: "Uhook",
  0x1ee7: "uhook",
  0x1ee8: "Uhornacute",
  0x1ee9: "uhornacute",
  0x1eea: "Uhorngrave",
  0x1eeb: "uhorngrave",
  0x1eec: "Uhornhook",
  0x1eed: "uhornhook",
  0x1eee: "Uhorntilde",
  0x1eef: "uhorntilde",
  0x1ef0: "Uhornbelowdot",
  0x1ef1: "uhornbelowdot",
  0x1ef4: "Ybelowdot",
  0x1ef5: "ybelowdot",
  0x1ef6: "Yhook",
  0x1ef7: "yhook",
  0x1ef8: "Ytilde",
  0x1ef9: "ytilde",
  0x01a0: "Ohorn",
  0x01a1: "ohorn",
  0x01af: "Uhorn",
  0x01b0: "uhorn",
  0x0323: "dead_belowdot",
  0x0309: "dead_hook",
  0x031b: "dead_horn"
});

// mapping is based on https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
const kbEventCodesToKeySyms = Object.freeze({
  "AltLeft": "Alt_L",
  "AltRight": "Alt_R",
  "ArrowDown": "Down",
  "ArrowLeft": "Left",
  "ArrowRight": "Right",
  "ArrowUp": "Up",
  "Backspace": "BackSpace",
  "CapsLock": "Caps_Lock",
  "ControlLeft": "Control_L",
  "ControlRight": "Control_R",
  "Enter": "Return",
  "HyperLeft": "Hyper_L",
  "HyperRight": "Hyper_R",
  "NumLock": "Num_Lock",
  "NumpadEnter": "Return",
  "MetaLeft": "Meta_L",
  "MetaRight": "Meta_R",
  "PageDown": "Page_Down",
  "PageUp": "Page_Up",
  "ScrollLock": "Scroll_Lock",
  "ShiftLeft": "Shift_L",
  "ShiftRight": "Shift_R",
  "SuperLeft": "Super_L",
  "SuperRight": "Super_R"
});

// these Keyboard Event codes direclty map to X11 Keysyms
const knownKbEventCodes = new Set([
  "Clear", "Copy", "Cut", "Delete", "End", "Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  "Home", "Insert", "Paste", "Redo", "Tab", "Undo"
]);

/**
 * Returns X11 keySym (defined in https://www.cl.cam.ac.uk/~mgk25/ucs/keysyms.txt) for a given key/code from the key[up/down] event
 * For keys with length 1 (ASCII, Cyrillic etc) - uses uniToKeySyms mapping
 * For keys with length > 1 (Modifiers, Whitespaces, Navigation etc) - uses knownKbEventCodes and kbEventCodesToKeySyms mapping
 *
 * @param {string} key 'key' from the key[up/down] event
 * @param {string} code 'code' from the key[up/down] event
 * @return {string} keySymString (X11 keysym string)
 */
export default function getKeysymString(key, code) {
  var keySym = "Unidentified";
  if (key.length === 1) {
    const keyCodeUni = key.charCodeAt(0);
    if (keyCodeUni in uniToKeySyms) {
      keySym = uniToKeySyms[keyCodeUni];
    }
  } else if (code in kbEventCodesToKeySyms) {
    keySym = kbEventCodesToKeySyms[code];
  } else if (knownKbEventCodes.has(code)) {
    keySym = code;
  }
  return keySym;
}
