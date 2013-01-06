
  g.prepareSound = function () {
    g.soundAvailable = e;
    g.soundReady = e;
    g.detectFlash();
    if (!g.hasFlash || !g.isFlashVersion("9.0.0.0")) {
      g.soundReady = a;
      g.checkIfEverythingIsReady()
    } else {
      g.flashIframe = document.createElement("iframe");
      g.flashIframe.name = "pm-sound";
      g.flashIframe.style.position = "absolute";
      g.flashIframe.style.top = "-150px";
      g.flashIframe.style.border = 0;
      g.flashIframe.style.width = "100px";
      g.flashIframe.style.height = "100px";
      google.dom.append(g.flashIframe);
      g.flashIframeDoc = g.flashIframe.contentDocument;
      if (g.flashIframeDoc == undefined || g.flashIframeDoc == null) g.flashIframeDoc = g.flashIframe.contentWindow.document;
      g.flashIframeDoc.open();
      g.flashIframeDoc.write('<html><head></head><body><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="0" height="0" id="pacman-sound-player" type="application/x-shockwave-flash"> <param name="movie" value="src/swf/pacman10-hp-sound.swf"> <param name="allowScriptAccess" value="always"> <object id="pacman-sound-player-2"  type="application/x-shockwave-flash" data="src/swf/pacman10-hp-sound.swf" width="0" height="0"><param name="allowScriptAccess" value="always"> </object></object></body></html>');
      g.flashIframeDoc.close();
      window.setTimeout(g.flashNotReady, 3E3)
    }
  };
  g.detectFlash = function () {
    var b = e,
      c = "";
    if (navigator.plugins && navigator.plugins.length) {
      var d = navigator.plugins["Shockwave Flash"];
      if (d) {
        b = a;
        if (d.description) c = g.getFlashVersion(d.description)
      }
      if (navigator.plugins["Shockwave Flash 2.0"]) {
        b = a;
        c = "2.0.0.11"
      }
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
      if (b = (d = navigator.mimeTypes["application/x-shockwave-flash"]) && d.enabledPlugin) {
        c = d.enabledPlugin.description;
        c = g.getFlashVersion(c)
      }
    } else try {
      d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
      b = a;
      c = g.getFlashVersion(d.GetVariable("$version"))
    } catch (f) {
      try {
        d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
        b = a;
        c = "6.0.21"
      } catch (h) {
        try {
          d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          b = a;
          c = g.getFlashVersion(d.GetVariable("$version"))
        } catch (j) {}
      }
    }
    g.hasFlash = b;
    g.flashVersion = c
  };
  g.isFlashVersion = function (b) {
    return g.compareVersions(g.flashVersion, b) >= 0
  };

  g.flashNotReady = function () {
    if (!g.ready) {
      g.soundAvailable = e;
      g.soundReady = a;
      g.checkIfEverythingIsReady()
    }
  };

  g.flashReady = function (b) {
    g.flashSoundPlayer = b;
    g.soundAvailable = a;
    g.soundReady = a;
    g.checkIfEverythingIsReady()
  };

  g.flashLoaded = function () {
    if (g.flashIframeDoc) {
      var b = g.flashIframeDoc.getElementById("pacman-sound-player");
      if (b && b.playTrack) {
        g.flashReady(b);
        return
      } else if ((b = g.flashIframeDoc.getElementById("pacman-sound-player-2")) && b.playTrack) {
        g.flashReady(b);
        return
      }
    }
    g.flashNotReady()
  };
