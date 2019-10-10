/****
 * 密码加密方法
*/
var Base64 =  require ("./base64");
var Md5 =  require ("./md5");
//入口
function encrypt(str)
{
    str = passport_encrypt(str,'etonepay');
    str = Base64.encode(str);
    return str;
}

//密码js加密
function passport_encrypt(txt, key) {
    var encrypt_key = Md5.hex_md5(Math.round(0, 32000));
    var ctr = 0;
    var tmp = '';
    for(var i = 0;i < txt.length; i++) {
        ctr = ctr == encrypt_key.length ? 0 : ctr;
        tmp +=String.fromCharCode(encrypt_key.charCodeAt(ctr))+ String.fromCharCode(txt.charCodeAt(i) ^ encrypt_key.charCodeAt(ctr++));
    }
    return passport_key(tmp, key);
}

//密码js加密
function passport_key(txt, encrypt_key) {
    var encrypt_key = Md5.hex_md5(encrypt_key);
    var ctr = 0;
    var tmp = '';
    for(var i = 0; i < txt.length; i++) {
        ctr = ctr == encrypt_key.length ? 0 : ctr;
        tmp +=String.fromCharCode(txt.charCodeAt(i) ^ encrypt_key.charCodeAt(ctr++));
    }
    return tmp;
}

//输出
module.exports = { encrypt }
