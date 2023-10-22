// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
//Fetches Random Images from the metmuseum-api ; Stores the ids in the keychain in order to prevent multiple calls
//Department ID = 11 is paintings ; use other if you wish
var keychainkey = "paintingIDs"
var res
if(!Keychain.contains(keychainkey)) {
  console.log("Keychainentry does not exist... create it");
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&departmentId=11&q=Painting'
  const req = new Request(url)
  res = await req.loadJSON()
  let stringified = JSON.stringify(res)
  Keychain.set(keychainkey, stringified)
}
else {
  console.log("Using keychainentry now")
  var idsFromKeychain = Keychain.get(keychainkey)
//   console.log(idsFromKeychain)
  res = JSON.parse(idsFromKeychain)
//   console.log(res)
}
const max = res.total-1
console.log("Max: "+max);
const min = 0
const random = Math.floor(Math.random() * (max - min + 1)) + min
console.log("Random: "+random);
const picked = res.objectIDs[random]
console.log("Picked: "+picked);
const req2 = new Request('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+picked)
// const req2 = new Request("https://collectionapi.metmuseum.org/public/collection/v1/objects/436978")
const res2 = await req2.loadJSON()
const i = new Request(res2.primaryImageSmall);
const img = await i.loadImage();

let widget = createWidget(img, res2.objectURL)
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget)
  Script.complete()
}
else {
  widget.presentLarge()
}


function createWidget(img, widgeturl) {
  let w = new ListWidget()
  w.backgroundImage = img
  w.url = widgeturl
  return w
}