/**
 * Created by XIEYAN630@pingan.com.cn on 2017/3/30.
 */
(function () {
    bison.registerNamespace("bison.util");
    bison.util.getMimeType = function (fileName) {
        var retval = "";
        switch (/\.[^\.]+$/.exec(fileName)) {
            case "0.001":
                retval = "application/x-001";
                break;
            case "0.323":
                retval = "text/h323";
                break;
            case "0.907":
                retval = "drawing/907";
                break;
            case ".acp":
                retval = "audio/x-mei-aac";
                break;
            case ".aif":
                retval = "audio/aiff";
                break;
            case ".aiff":
                retval = "audio/aiff";
                break;
            case ".asa":
                retval = "text/asa";
                break;
            case ".asp":
                retval = "text/asp";
                break;
            case ".au":
                retval = "audio/basic";
                break;
            case ".awf":
                retval = "application/vnd.adobe.workflow";
                break;
            case ".bmp":
                retval = "application/x-bmp";
                break;
            case ".c4t":
                retval = "application/x-c4t";
                break;
            case ".cal":
                retval = "application/x-cals";
                break;
            case ".cdf":
                retval = "application/x-netcdf";
                break;
            case ".cel":
                retval = "application/x-cel";
                break;
            case ".cg4":
                retval = "application/x-g4";
                break;
            case ".cit":
                retval = "application/x-cit";
                break;
            case ".cml":
                retval = "text/xml";
                break;
            case ".cmx":
                retval = "application/x-cmx";
                break;
            case ".crl":
                retval = "application/pkix-crl";
                break;
            case ".csi":
                retval = "application/x-csi";
                break;
            case ".cut":
                retval = "application/x-cut";
                break;
            case ".dbm":
                retval = "application/x-dbm";
                break;
            case ".dcd":
                retval = "text/xml";
                break;
            case ".der":
                retval = "application/x-x509-ca-cert";
                break;
            case ".dib":
                retval = "application/x-dib";
                break;
            case ".doc":
                retval = "application/msword";
                break;
            case ".drw":
                retval = "application/x-drw";
                break;
            case ".dwf":
                retval = "Model/vnd.dwf";
                break;
            case ".dwg":
                retval = "application/x-dwg";
                break;
            case ".dxf":
                retval = "application/x-dxf";
                break;
            case ".emf":
                retval = "application/x-emf";
                break;
            case ".ent":
                retval = "text/xml";
                break;
            case ".eps":
                retval = "application/x-ps";
                break;
            case ".etd":
                retval = "application/x-ebx";
                break;
            case ".fax":
                retval = "image/fax";
                break;
            case ".fif":
                retval = "application/fractals";
                break;
            case ".frm":
                retval = "application/x-frm";
                break;
            case ".gbr":
                retval = "application/x-gbr";
                break;
            case ".gif":
                retval = "image/gif";
                break;
            case ".gp4":
                retval = "application/x-gp4";
                break;
            case ".hmr":
                retval = "application/x-hmr";
                break;
            case ".hpl":
                retval = "application/x-hpl";
                break;
            case ".hrf":
                retval = "application/x-hrf";
                break;
            case ".htc":
                retval = "text/x-component";
                break;
            case ".html":
                retval = "text/html";
                break;
            case ".htx":
                retval = "text/html";
                break;
            case ".ico":
                retval = "image/x-icon";
                break;
            case ".iff":
                retval = "application/x-iff";
                break;
            case ".igs":
                retval = "application/x-igs";
                break;
            case ".img":
                retval = "application/x-img";
                break;
            case ".isp":
                retval = "application/x-internet-signup";
                break;
            case ".java":
                retval = "java/*";
                break;
            case ".jpe":
                retval = "image/jpeg";
                break;
            case ".jpeg":
                retval = "image/jpeg";
                break;
            case ".jpg":
                retval = "application/x-jpg";
                break;
            case ".jsp":
                retval = "text/html";
                break;
            case ".lar":
                retval = "application/x-laplayer-reg";
                break;
            case ".lavs":
                retval = "audio/x-liquid-secure";
                break;
            case ".lmsff":
                retval = "audio/x-la-lms";
                break;
            case ".ltr":
                retval = "application/x-ltr";
                break;
            case ".m2v":
                retval = "video/x-mpeg";
                break;
            case ".m4e":
                retval = "video/mpeg4";
                break;
            case ".man":
                retval = "application/x-troff-man";
                break;
            case ".mdb":
                retval = "application/msaccess";
                break;
            case ".mfp":
                retval = "application/x-shockwave-flash";
                break;
            case ".mhtml":
                retval = "message/rfc822";
                break;
            case ".mid":
                retval = "audio/mid";
                break;
            case ".mil":
                retval = "application/x-mil";
                break;
            case ".mnd":
                retval = "audio/x-musicnet-download";
                break;
            case ".mocha":
                retval = "application/x-javascript";
                break;
            case ".mp1":
                retval = "audio/mp1";
                break;
            case ".mp2v":
                retval = "video/mpeg";
                break;
            case ".mp4":
                retval = "video/mpeg4";
                break;
            case ".mpd":
                retval = "application/vnd.ms-project";
                break;
            case ".mpeg":
                retval = "video/mpg";
                break;
            case ".mpga":
                retval = "audio/rn-mpeg";
                break;
            case ".mps":
                retval = "video/x-mpeg";
                break;
            case ".mpv":
                retval = "video/mpg";
                break;
            case ".mpw":
                retval = "application/vnd.ms-project";
                break;
            case ".mtx":
                retval = "text/xml";
                break;
            case ".net":
                retval = "image/pnetvue";
                break;
            case ".nws":
                retval = "message/rfc822";
                break;
            case ".out":
                retval = "application/x-out";
                break;
            case ".p12":
                retval = "application/x-pkcs12";
                break;
            case ".p7c":
                retval = "application/pkcs7-mime";
                break;
            case ".p7r":
                retval = "application/x-pkcs7-certreqresp";
                break;
            case ".pc5":
                retval = "application/x-pc5";
                break;
            case ".pcl":
                retval = "application/x-pcl";
                break;
            case ".pdf":
                retval = "application/pdf";
                break;
            case ".pdx":
                retval = "application/vnd.adobe.pdx";
                break;
            case ".pgl":
                retval = "application/x-pgl";
                break;
            case ".pko":
                retval = "application/vnd.ms-pki.pko";
                break;
            case ".plg":
                retval = "text/html";
                break;
            case ".plt":
                retval = "application/x-plt";
                break;
            case ".png":
                retval = "application/x-png";
                break;
            case ".ppa":
                retval = "application/vnd.ms-powerpoint";
                break;
            case ".pps":
                retval = "application/vnd.ms-powerpoint";
                break;
            case ".ppt":
                retval = "application/x-ppt";
                break;
            case ".prf":
                retval = "application/pics-rules";
                break;
            case ".prt":
                retval = "application/x-prt";
                break;
            case ".ps":
                retval = "application/postscript";
                break;
            case ".pwz":
                retval = "application/vnd.ms-powerpoint";
                break;
            case ".ra":
                retval = "audio/vnd.rn-realaudio";
                break;
            case ".ras":
                retval = "application/x-ras";
                break;
            case ".rdf":
                retval = "text/xml";
                break;
            case ".red":
                retval = "application/x-red";
                break;
            case ".rjs":
                retval = "application/vnd.rn-realsystem-rjs";
                break;
            case ".rlc":
                retval = "application/x-rlc";
                break;
            case ".rm":
                retval = "application/vnd.rn-realmedia";
                break;
            case ".rmi":
                retval = "audio/mid";
                break;
            case ".rmm":
                retval = "audio/x-pn-realaudio";
                break;
            case ".rms":
                retval = "application/vnd.rn-realmedia-secure";
                break;
            case ".rmx":
                retval = "application/vnd.rn-realsystem-rmx";
                break;
            case ".rp":
                retval = "image/vnd.rn-realpix";
                break;
            case ".rsml":
                retval = "application/vnd.rn-rsml";
                break;
            case ".rtf":
                retval = "application/msword";
                break;
            case ".rv":
                retval = "video/vnd.rn-realvideo";
                break;
            case ".sat":
                retval = "application/x-sat";
                break;
            case ".sdw":
                retval = "application/x-sdw";
                break;
            case ".slb":
                retval = "application/x-slb";
                break;
            case ".slk":
                retval = "drawing/x-slk";
                break;
            case ".smil":
                retval = "application/smil";
                break;
            case ".snd":
                retval = "audio/basic";
                break;
            case ".sor":
                retval = "text/plain";
                break;
            case ".spl":
                retval = "application/futuresplash";
                break;
            case ".ssm":
                retval = "application/streamingmedia";
                break;
            case ".stl":
                retval = "application/vnd.ms-pki.stl";
                break;
            case ".sty":
                retval = "application/x-sty";
                break;
            case ".swf":
                retval = "application/x-shockwave-flash";
                break;
            case ".tg4":
                retval = "application/x-tg4";
                break;
            case ".tif":
                retval = "image/tiff";
                break;
            case ".tiff":
                retval = "image/tiff";
                break;
            case ".top":
                retval = "drawing/x-top";
                break;
            case ".tsd":
                retval = "text/xml";
                break;
            case ".uin":
                retval = "application/x-icq";
                break;
            case ".vcf":
                retval = "text/x-vcard";
                break;
            case ".vdx":
                retval = "application/vnd.visio";
                break;
            case ".vpg":
                retval = "application/x-vpeg005";
                break;
            case ".vsd":
                retval = "application/x-vsd";
                break;
            case ".vst":
                retval = "application/vnd.visio";
                break;
            case ".vsw":
                retval = "application/vnd.visio";
                break;
            case ".vtx":
                retval = "application/vnd.visio";
                break;
            case ".wav":
                retval = "audio/wav";
                break;
            case ".wb1":
                retval = "application/x-wb1";
                break;
            case ".wb3":
                retval = "application/x-wb3";
                break;
            case ".wiz":
                retval = "application/msword";
                break;
            case ".wk4":
                retval = "application/x-wk4";
                break;
            case ".wks":
                retval = "application/x-wks";
                break;
            case ".wma":
                retval = "audio/x-ms-wma";
                break;
            case ".wmf":
                retval = "application/x-wmf";
                break;
            case ".wmv":
                retval = "video/x-ms-wmv";
                break;
            case ".wmz":
                retval = "application/x-ms-wmz";
                break;
            case ".wpd":
                retval = "application/x-wpd";
                break;
            case ".wpl":
                retval = "application/vnd.ms-wpl";
                break;
            case ".wr1":
                retval = "application/x-wr1";
                break;
            case ".wrk":
                retval = "application/x-wrk";
                break;
            case ".ws2":
                retval = "application/x-ws";
                break;
            case ".wsdl":
                retval = "text/xml";
                break;
            case ".xdp":
                retval = "application/vnd.adobe.xdp";
                break;
            case ".xfd":
                retval = "application/vnd.adobe.xfd";
                break;
            case ".xhtml":
                retval = "text/html";
                break;
            case ".xls":
                retval = "application/x-xls";
                break;
            case ".xml":
                retval = "text/xml";
                break;
            case ".xq":
                retval = "text/xml";
                break;
            case ".xquery":
                retval = "text/xml";
                break;
            case ".xsl":
                retval = "text/xml";
                break;
            case ".xwd":
                retval = "application/x-xwd";
                break;
            case ".sis":
                retval = "application/vnd.symbian.install";
                break;
            case ".x_t":
                retval = "application/x-x_t";
                break;
            case ".apk":
                retval = "application/vnd.android.package-archive";
                break;
            case ".tif":
                retval = "image/tiff";
                break;
            case "0.301":
                retval = "application/x-301";
                break;
            case "0.906":
                retval = "application/x-906";
                break;
            case ".a11":
                retval = "application/x-a11";
                break;
            case ".ai":
                retval = "application/postscript";
                break;
            case ".aifc":
                retval = "audio/aiff";
                break;
            case ".anv":
                retval = "application/x-anv";
                break;
            case ".asf":
                retval = "video/x-ms-asf";
                break;
            case ".asx":
                retval = "video/x-ms-asf";
                break;
            case ".avi":
                retval = "video/avi";
                break;
            case ".biz":
                retval = "text/xml";
                break;
            case ".bot":
                retval = "application/x-bot";
                break;
            case ".c90":
                retval = "application/x-c90";
                break;
            case ".cat":
                retval = "application/vnd.ms-pki.seccat";
                break;
            case ".cdr":
                retval = "application/x-cdr";
                break;
            case ".cer":
                retval = "application/x-x509-ca-cert";
                break;
            case ".cgm":
                retval = "application/x-cgm";
                break;
            case ".class":
                retval = "java/*";
                break;
            case ".cmp":
                retval = "application/x-cmp";
                break;
            case ".cot":
                retval = "application/x-cot";
                break;
            case ".crt":
                retval = "application/x-x509-ca-cert";
                break;
            case ".css":
                retval = "text/css";
                break;
            case ".dbf":
                retval = "application/x-dbf";
                break;
            case ".dbx":
                retval = "application/x-dbx";
                break;
            case ".dcx":
                retval = "application/x-dcx";
                break;
            case ".dgn":
                retval = "application/x-dgn";
                break;
            case ".dll":
                retval = "application/x-msdownload";
                break;
            case ".dot":
                retval = "application/msword";
                break;
            case ".dtd":
                retval = "text/xml";
                break;
            case ".dwf":
                retval = "application/x-dwf";
                break;
            case ".dxb":
                retval = "application/x-dxb";
                break;
            case ".edn":
                retval = "application/vnd.adobe.edn";
                break;
            case ".eml":
                retval = "message/rfc822";
                break;
            case ".epi":
                retval = "application/x-epi";
                break;
            case ".eps":
                retval = "application/postscript";
                break;
            case ".exe":
                retval = "application/x-msdownload";
                break;
            case ".fdf":
                retval = "application/vnd.fdf";
                break;
            case ".fo":
                retval = "text/xml";
                break;
            case ".g4":
                retval = "application/x-g4";
                break;
            case ".":
                retval = "application/x-";
                break;
            case ".gl2":
                retval = "application/x-gl2";
                break;
            case ".hgl":
                retval = "application/x-hgl";
                break;
            case ".hpg":
                retval = "application/x-hpgl";
                break;
            case ".hqx":
                retval = "application/mac-binhex40";
                break;
            case ".hta":
                retval = "application/hta";
                break;
            case ".htm":
                retval = "text/html";
                break;
            case ".htt":
                retval = "text/webviewhtml";
                break;
            case ".icb":
                retval = "application/x-icb";
                break;
            case ".ico":
                retval = "application/x-ico";
                break;
            case ".ig4":
                retval = "application/x-g4";
                break;
            case ".iii":
                retval = "application/x-iphone";
                break;
            case ".ins":
                retval = "application/x-internet-signup";
                break;
            case ".IVF":
                retval = "video/x-ivf";
                break;
            case ".jfif":
                retval = "image/jpeg";
                break;
            case ".jpe":
                retval = "application/x-jpe";
                break;
            case ".jpg":
                retval = "image/jpeg";
                break;
            case ".js":
                retval = "application/x-javascript";
                break;
            case ".la1":
                retval = "audio/x-liquid-file";
                break;
            case ".latex":
                retval = "application/x-latex";
                break;
            case ".lbm":
                retval = "application/x-lbm";
                break;
            case ".ls":
                retval = "application/x-javascript";
                break;
            case ".m1v":
                retval = "video/x-mpeg";
                break;
            case ".m3u":
                retval = "audio/mpegurl";
                break;
            case ".mac":
                retval = "application/x-mac";
                break;
            case ".math":
                retval = "text/xml";
                break;
            case ".mdb":
                retval = "application/x-mdb";
                break;
            case ".mht":
                retval = "message/rfc822";
                break;
            case ".mi":
                retval = "application/x-mi";
                break;
            case ".midi":
                retval = "audio/mid";
                break;
            case ".mml":
                retval = "text/xml";
                break;
            case ".mns":
                retval = "audio/x-musicnet-stream";
                break;
            case ".movie":
                retval = "video/x-sgi-movie";
                break;
            case ".mp2":
                retval = "audio/mp2";
                break;
            case ".mp3":
                retval = "audio/mp3";
                break;
            case ".mpa":
                retval = "video/x-mpg";
                break;
            case ".mpe":
                retval = "video/x-mpeg";
                break;
            case ".mpg":
                retval = "video/mpg";
                break;
            case ".mpp":
                retval = "application/vnd.ms-project";
                break;
            case ".mpt":
                retval = "application/vnd.ms-project";
                break;
            case ".mpv2":
                retval = "video/mpeg";
                break;
            case ".mpx":
                retval = "application/vnd.ms-project";
                break;
            case ".mxp":
                retval = "application/x-mmxp";
                break;
            case ".nrf":
                retval = "application/x-nrf";
                break;
            case ".odc":
                retval = "text/x-ms-odc";
                break;
            case ".p10":
                retval = "application/pkcs10";
                break;
            case ".p7b":
                retval = "application/x-pkcs7-certificates";
                break;
            case ".p7m":
                retval = "application/pkcs7-mime";
                break;
            case ".p7s":
                retval = "application/pkcs7-signature";
                break;
            case ".pci":
                retval = "application/x-pci";
                break;
            case ".pcx":
                retval = "application/x-pcx";
                break;
            case ".pdf":
                retval = "application/pdf";
                break;
            case ".pfx":
                retval = "application/x-pkcs12";
                break;
            case ".pic":
                retval = "application/x-pic";
                break;
            case ".pl":
                retval = "application/x-perl";
                break;
            case ".pls":
                retval = "audio/scpls";
                break;
            case ".png":
                retval = "image/png";
                break;
            case ".pot":
                retval = "application/vnd.ms-powerpoint";
                break;
            case ".ppm":
                retval = "application/x-ppm";
                break;
            case ".ppt":
                retval = "application/vnd.ms-powerpoint";
                break;
            case ".pr":
                retval = "application/x-pr";
                break;
            case ".prn":
                retval = "application/x-prn";
                break;
            case ".ps":
                retval = "application/x-ps";
                break;
            case ".ptn":
                retval = "application/x-ptn";
                break;
            case ".r3t":
                retval = "text/vnd.rn-realtext3d";
                break;
            case ".ram":
                retval = "audio/x-pn-realaudio";
                break;
            case ".rat":
                retval = "application/rat-file";
                break;
            case ".rec":
                retval = "application/vnd.rn-recording";
                break;
            case ".rgb":
                retval = "application/x-rgb";
                break;
            case ".rjt":
                retval = "application/vnd.rn-realsystem-rjt";
                break;
            case ".rle":
                retval = "application/x-rle";
                break;
            case ".rmf":
                retval = "application/vnd.adobe.rmf";
                break;
            case ".rmj":
                retval = "application/vnd.rn-realsystem-rmj";
                break;
            case ".rmp":
                retval = "application/vnd.rn-rn_music_package";
                break;
            case ".rmvb":
                retval = "application/vnd.rn-realmedia-vbr";
                break;
            case ".rnx":
                retval = "application/vnd.rn-realplayer";
                break;
            case ".rpm":
                retval = "audio/x-pn-realaudio-plugin";
                break;
            case ".rt":
                retval = "text/vnd.rn-realtext";
                break;
            case ".rtf":
                retval = "application/x-rtf";
                break;
            case ".sam":
                retval = "application/x-sam";
                break;
            case ".sdp":
                retval = "application/sdp";
                break;
            case ".sit":
                retval = "application/x-stuffit";
                break;
            case ".sld":
                retval = "application/x-sld";
                break;
            case ".smi":
                retval = "application/smil";
                break;
            case ".smk":
                retval = "application/x-smk";
                break;
            case ".sol":
                retval = "text/plain";
                break;
            case ".spc":
                retval = "application/x-pkcs7-certificates";
                break;
            case ".spp":
                retval = "text/xml";
                break;
            case ".sst":
                retval = "application/vnd.ms-pki.certstore";
                break;
            case ".stm":
                retval = "text/html";
                break;
            case ".svg":
                retval = "text/xml";
                break;
            case ".tdf":
                retval = "application/x-tdf";
                break;
            case ".tga":
                retval = "application/x-tga";
                break;
            case ".tif":
                retval = "application/x-tif";
                break;
            case ".tld":
                retval = "text/xml";
                break;
            case ".torrent":
                retval = "application/x-bittorrent";
                break;
            case ".txt":
                retval = "text/plain";
                break;
            case ".uls":
                retval = "text/iuls";
                break;
            case ".vda":
                retval = "application/x-vda";
                break;
            case ".vml":
                retval = "text/xml";
                break;
            case ".vsd":
                retval = "application/vnd.visio";
                break;
            case ".vss":
                retval = "application/vnd.visio";
                break;
            case ".vst":
                retval = "application/x-vst";
                break;
            case ".vsx":
                retval = "application/vnd.visio";
                break;
            case ".vxml":
                retval = "text/xml";
                break;
            case ".wax":
                retval = "audio/x-ms-wax";
                break;
            case ".wb2":
                retval = "application/x-wb2";
                break;
            case ".wbmp":
                retval = "image/vnd.wap.wbmp";
                break;
            case ".wk3":
                retval = "application/x-wk3";
                break;
            case ".wkq":
                retval = "application/x-wkq";
                break;
            case ".wm":
                retval = "video/x-ms-wm";
                break;
            case ".wmd":
                retval = "application/x-ms-wmd";
                break;
            case ".wml":
                retval = "text/vnd.wap.wml";
                break;
            case ".wmx":
                retval = "video/x-ms-wmx";
                break;
            case ".wp6":
                retval = "application/x-wp6";
                break;
            case ".wpg":
                retval = "application/x-wpg";
                break;
            case ".wq1":
                retval = "application/x-wq1";
                break;
            case ".wri":
                retval = "application/x-wri";
                break;
            case ".ws":
                retval = "application/x-ws";
                break;
            case ".wsc":
                retval = "text/scriptlet";
                break;
            case ".wvx":
                retval = "video/x-ms-wvx";
                break;
            case ".xdr":
                retval = "text/xml";
                break;
            case ".xfdf":
                retval = "application/vnd.adobe.xfdf";
                break;
            case ".xls":
                retval = "application/vnd.ms-excel";
                break;
            case ".xlw":
                retval = "application/x-xlw";
                break;
            case ".xpl":
                retval = "audio/scpls";
                break;
            case ".xql":
                retval = "text/xml";
                break;
            case ".xsd":
                retval = "text/xml";
                break;
            case ".xslt":
                retval = "text/xml";
                break;
            case ".x_b":
                retval = "application/x-x_b";
                break;
            case ".sisx":
                retval = "application/vnd.symbian.install";
                break;
            case ".ipa":
                retval = "application/vnd.iphone";
                break;
            case ".xap":
                retval = "application/x-silverlight-app";
                break;
            default:
                retval = "application/octet-stream";
                break;//.*（ 二进制流，不知道下载文件类型）
        }
        return retval;
    };
}());