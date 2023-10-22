// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: calendar-alt;
///
// Both of these first open Scriptable and then go to the Shortcuts app and STAY there (No difference between the two)
// shortcuts://x-callback-url/run-shortcut?name=rem-summary&source=homescreen 
// shortcuts://x-callback-url/run-shortcut?name=rem-summary&x-success=launcher://homescreen
// shortcuts://run-shortcut?name=rem-summary
///
const file_mg = FileManager.local()

const kc_s1 = "lilf_s1";
const isMac = Device.name().includes("Mac");
var lilf_s1 = "";
if (true && (Keychain.contains(kc_s1) && Keychain.get(kc_s1) != "")) {
    lilf_s1 = Keychain.get(kc_s1);
} else {
    // Alerts aren't supported in widgets, so you need to run this script manually to set this up
    alert = new Alert();
    alert.addSecureTextField("Enter secret (You can get the authorization header using  'dbg garden-req')", "");
    await alert.presentAlert();
    lilf_s1 = alert.textFieldValue(0);
    Keychain.set(kc_s1, lilf_s1);
}

w1 = new ListWidget();
lg = new LinearGradient();
lg.colors = [new Color("#a0ff99"), new Color("#00d4ff")];
lg.locations = [0, 1];
w1.backgroundGradient = lg;

var retried = false
while (true) {
if (isMac && (! retried)) {
   // && file_mg.isDirectory("/Users/evar/cellar/notes/reminders/")
   ///
   req = new Request("http://127.0.0.1:7230/zsh/"); 
} else {
   req = new Request("https://garden.lilf.ir/api/v1/zsh/");
}
req.headers = {
    'Authorization': lilf_s1,
    "Content-Type": "application/json; charset=utf-8"
  };
req.method = 'POST';
req.body = JSON.stringify({
    "cmd": "reval-true iwidget-rem",
    "stdin": "",
    "verbose": "0"
});
res = await req.loadString();
if (res != "") {
  break
} else {
  if (retried) {
    break  
  }
  retried = true 
}
}
text = w1.addText(res);
text.url = 'shortcuts://run-shortcut?name=rem-summary'
// text.textColor = new Color("#fff0c4"); //light orange
// text.textColor = new Color("#390080");
// text.textColor = new Color("#fbffc9");
text.minimumScaleFactor = 1.0
Script.setWidget(w1);

if (config.runsInWidget == false) {
    //w1.presentMedium();
    w1.presentLarge();
}