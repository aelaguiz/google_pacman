  var a = true,
    e = false,
    g = {},
    i = [1, 4, 2, 8],
    l = {
      0: {
        axis: 0,
        increment: 0
      },
      1: {
        axis: 0,
        increment: -1
      },
      2: {
        axis: 0,
        increment: +1
      },
      4: {
        axis: 1,
        increment: -1
      },
      8: {
        axis: 1,
        increment: +1
      }
    },
    m = [0, 7, 17, 32],
    n = [{
      x: 5,
      y: 1,
      w: 56
    },
    {
      x: 5,
      y: 4,
      w: 5
    },
    {
      x: 5,
      y: 1,
      h: 4
    },
    {
      x: 9,
      y: 1,
      h: 12
    },
    {
      x: 5,
      y: 12,
      h: 4
    },
    {
      x: 10,
      y: 12,
      h: 4
    },
    {
      x: 5,
      y: 15,
      w: 16
    },
    {
      x: 5,
      y: 12,
      w: 31
    },
    {
      x: 60,
      y: 1,
      h: 4
    },
    {
      x: 54,
      y: 1,
      h: 4
    },
    {
      x: 19,
      y: 1,
      h: 12
    },
    {
      x: 19,
      y: 4,
      w: 26
    },
    {
      x: 13,
      y: 5,
      w: 7
    },
    {
      x: 13,
      y: 5,
      h: 4
    },
    {
      x: 13,
      y: 8,
      w: 3
    },
    {
      x: 56,
      y: 4,
      h: 9
    },
    {
      x: 48,
      y: 4,
      w: 13
    },
    {
      x: 48,
      y: 1,
      h: 12
    },
    {
      x: 60,
      y: 12,
      h: 4
    },
    {
      x: 44,
      y: 15,
      w: 17
    },
    {
      x: 54,
      y: 12,
      h: 4
    },
    {
      x: 44,
      y: 12,
      w: 17
    },
    {
      x: 44,
      y: 1,
      h: 15
    },
    {
      x: 41,
      y: 13,
      w: 4
    },
    {
      x: 41,
      y: 13,
      h: 3
    },
    {
      x: 38,
      y: 13,
      h: 3
    },
    {
      x: 38,
      y: 15,
      w: 4
    },
    {
      x: 35,
      y: 10,
      w: 10
    },
    {
      x: 35,
      y: 1,
      h: 15
    },
    {
      x: 35,
      y: 13,
      w: 4
    },
    {
      x: 21,
      y: 12,
      h: 4
    },
    {
      x: 24,
      y: 12,
      h: 4
    },
    {
      x: 24,
      y: 15,
      w: 12
    },
    {
      x: 27,
      y: 4,
      h: 9
    },
    {
      x: 52,
      y: 9,
      w: 5
    },
    {
      x: 56,
      y: 8,
      w: 10,
      type: 1
    },
    {
      x: 1,
      y: 8,
      w: 9,
      type: 1
    }],
    o = [{
      x: 1,
      y: 8,
      w: 8
    },
    {
      x: 57,
      y: 8,
      w: 9
    },
    {
      x: 44,
      y: 2,
      h: 10
    },
    {
      x: 35,
      y: 5,
      h: 7
    },
    {
      x: 36,
      y: 4,
      w: 8
    },
    {
      x: 36,
      y: 10,
      w: 8
    },
    {
      x: 39,
      y: 15,
      w: 2
    }],
    p = [{
      x: 5,
      y: 15
    },
    {
      x: 5,
      y: 3
    },
    {
      x: 15,
      y: 8
    },
    {
      x: 60,
      y: 3
    },
    {
      x: 60,
      y: 15
    }],
    q = [{
      x: 2,
      y: 8
    },
    {
      x: 63,
      y: 8
    }],
    r = {
      1: [{
        x: 39.5,
        y: 15,
        dir: 4
      },
      {
        x: 39.5,
        y: 4,
        dir: 4,
        scatterX: 57,
        scatterY: -4
      },
      {
        x: 39.5,
        y: 7,
        dir: 2,
        scatterX: 0,
        scatterY: -4
      },
      {
        x: 37.625,
        y: 7,
        dir: 1,
        scatterX: 57,
        scatterY: 20
      },
      {
        x: 41.375,
        y: 7,
        dir: 1,
        scatterX: 0,
        scatterY: 20
      }],
      2: [{
        x: 40.25,
        y: 15,
        dir: 8
      },
      {
        x: 38.75,
        y: 15,
        dir: 4
      },
      {
        x: 39.5,
        y: 4,
        dir: 4,
        scatterX: 57,
        scatterY: -4
      },
      {
        x: 39.5,
        y: 7,
        dir: 2,
        scatterX: 0,
        scatterY: -4
      },
      {
        x: 37.625,
        y: 7,
        dir: 1,
        scatterX: 57,
        scatterY: 20
      },
      {
        x: 41.375,
        y: 7,
        dir: 1,
        scatterX: 0,
        scatterY: 20
      }]
    },
    s = [32, 312],
    v = [80, 312],
    w = {
      0: 0.16,
      1: 0.23,
      2: 1,
      3: 1,
      4: 2.23,
      5: 0.3,
      6: 1.9,
      7: 2.23,
      8: 1.9,
      9: 5,
      10: 1.9,
      11: 1.18,
      12: 0.3,
      13: 0.5,
      14: 1.9,
      15: 9,
      16: 10,
      17: 0.26
    },
    y = 0.8 * 0.4,
    z = [{},
    {
      ghostSpeed: 0.75,
      ghostTunnelSpeed: 0.4,
      playerSpeed: 0.8,
      dotEatingSpeed: 0.71,
      ghostFrightSpeed: 0.5,
      playerFrightSpeed: 0.9,
      dotEatingFrightSpeed: 0.79,
      elroyDotsLeftPart1: 20,
      elroySpeedPart1: 0.8,
      elroyDotsLeftPart2: 10,
      elroySpeedPart2: 0.85,
      frightTime: 6,
      frightBlinkCount: 5,
      fruit: 1,
      fruitScore: 100,
      ghostModeSwitchTimes: [7, 20, 7, 20, 5, 20, 5, 1],
      penForceTime: 4,
      penLeavingLimits: [0, 0, 30, 60]
    },
    {
      ghostSpeed: 0.85,
      ghostTunnelSpeed: 0.45,
      playerSpeed: 0.9,
      dotEatingSpeed: 0.79,
      ghostFrightSpeed: 0.55,
      playerFrightSpeed: 0.95,
      dotEatingFrightSpeed: 0.83,
      elroyDotsLeftPart1: 30,
      elroySpeedPart1: 0.9,
      elroyDotsLeftPart2: 15,
      elroySpeedPart2: 0.95,
      frightTime: 5,
      frightBlinkCount: 5,
      fruit: 2,
      fruitScore: 300,
      ghostModeSwitchTimes: [7, 20, 7, 20, 5, 1033, 1 / 60, 1],
      penForceTime: 4,
      penLeavingLimits: [0, 0, 0, 50],
      cutsceneId: 1
    },
    {
      ghostSpeed: 0.85,
      ghostTunnelSpeed: 0.45,
      playerSpeed: 0.9,
      dotEatingSpeed: 0.79,
      ghostFrightSpeed: 0.55,
      playerFrightSpeed: 0.95,
      dotEatingFrightSpeed: 0.83,
      elroyDotsLeftPart1: 40,
      elroySpeedPart1: 0.9,
      elroyDotsLeftPart2: 20,
      elroySpeedPart2: 0.95,
      frightTime: 4,
      frightBlinkCount: 5,
      fruit: 3,
      fruitScore: 500,
      ghostModeSwitchTimes: [7, 20, 7, 20, 5, 1033, 1 / 60, 1],
      penForceTime: 4,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.85,
      ghostTunnelSpeed: 0.45,
      playerSpeed: 0.9,
      dotEatingSpeed: 0.79,
      ghostFrightSpeed: 0.55,
      playerFrightSpeed: 0.95,
      dotEatingFrightSpeed: 0.83,
      elroyDotsLeftPart1: 40,
      elroySpeedPart1: 0.9,
      elroyDotsLeftPart2: 20,
      elroySpeedPart2: 0.95,
      frightTime: 3,
      frightBlinkCount: 5,
      fruit: 3,
      fruitScore: 500,
      ghostModeSwitchTimes: [7, 20, 7, 20, 5, 1033, 1 / 60, 1],
      penForceTime: 4,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 40,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 20,
      elroySpeedPart2: 1.05,
      frightTime: 2,
      frightBlinkCount: 5,
      fruit: 4,
      fruitScore: 700,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0],
      cutsceneId: 2
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 50,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 25,
      elroySpeedPart2: 1.05,
      frightTime: 5,
      frightBlinkCount: 5,
      fruit: 4,
      fruitScore: 700,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 50,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 25,
      elroySpeedPart2: 1.05,
      frightTime: 2,
      frightBlinkCount: 5,
      fruit: 5,
      fruitScore: 1E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 50,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 25,
      elroySpeedPart2: 1.05,
      frightTime: 2,
      frightBlinkCount: 5,
      fruit: 5,
      fruitScore: 1E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 60,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 30,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 6,
      fruitScore: 2E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0],
      cutsceneId: 3
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 60,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 30,
      elroySpeedPart2: 1.05,
      frightTime: 5,
      frightBlinkCount: 5,
      fruit: 6,
      fruitScore: 2E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 60,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 30,
      elroySpeedPart2: 1.05,
      frightTime: 2,
      frightBlinkCount: 5,
      fruit: 7,
      fruitScore: 3E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 80,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 40,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 7,
      fruitScore: 3E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 80,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 40,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0],
      cutsceneId: 3
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 80,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 40,
      elroySpeedPart2: 1.05,
      frightTime: 3,
      frightBlinkCount: 5,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 100,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 50,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 100,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 50,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 100,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 50,
      elroySpeedPart2: 1.05,
      frightTime: 0,
      frightBlinkCount: 0,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0],
      cutsceneId: 3
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 100,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 50,
      elroySpeedPart2: 1.05,
      frightTime: 1,
      frightBlinkCount: 3,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 120,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 60,
      elroySpeedPart2: 1.05,
      frightTime: 0,
      frightBlinkCount: 0,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 1,
      dotEatingSpeed: 0.87,
      ghostFrightSpeed: 0.6,
      playerFrightSpeed: 1,
      dotEatingFrightSpeed: 0.87,
      elroyDotsLeftPart1: 120,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 60,
      elroySpeedPart2: 1.05,
      frightTime: 0,
      frightBlinkCount: 0,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    },
    {
      ghostSpeed: 0.95,
      ghostTunnelSpeed: 0.5,
      playerSpeed: 0.9,
      dotEatingSpeed: 0.79,
      ghostFrightSpeed: 0.75,
      playerFrightSpeed: 0.9,
      dotEatingFrightSpeed: 0.79,
      elroyDotsLeftPart1: 120,
      elroySpeedPart1: 1,
      elroyDotsLeftPart2: 60,
      elroySpeedPart2: 1.05,
      frightTime: 0,
      frightBlinkCount: 0,
      fruit: 8,
      fruitScore: 5E3,
      ghostModeSwitchTimes: [5, 20, 5, 20, 5, 1037, 1 / 60, 1],
      penForceTime: 3,
      penLeavingLimits: [0, 0, 0, 0]
    }],
    A = {
      1: [{
        x: 37.6,
        y: 7,
        dir: 1,
        dest: 6.375,
        speed: 0.48
      },
      {
        x: 37.6,
        y: 6.375,
        dir: 2,
        dest: 7.625,
        speed: 0.48
      },
      {
        x: 37.6,
        y: 7.625,
        dir: 1,
        dest: 7,
        speed: 0.48
      }],
      2: [{
        x: 39.5,
        y: 7,
        dir: 2,
        dest: 7.625,
        speed: 0.48
      },
      {
        x: 39.5,
        y: 7.625,
        dir: 1,
        dest: 6.375,
        speed: 0.48
      },
      {
        x: 39.5,
        y: 6.375,
        dir: 2,
        dest: 7,
        speed: 0.48
      }],
      3: [{
        x: 41.4,
        y: 7,
        dir: 1,
        dest: 6.375,
        speed: 0.48
      },
      {
        x: 41.4,
        y: 6.375,
        dir: 2,
        dest: 7.625,
        speed: 0.48
      },
      {
        x: 41.4,
        y: 7.625,
        dir: 1,
        dest: 7,
        speed: 0.48
      }],
      4: [{
        x: 37.6,
        y: 7,
        dir: 8,
        dest: 39.5,
        speed: y
      },
      {
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }],
      5: [{
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }],
      6: [{
        x: 41.4,
        y: 7,
        dir: 4,
        dest: 39.5,
        speed: y
      },
      {
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }],
      7: [{
        x: 39.5,
        y: 4,
        dir: 2,
        dest: 7,
        speed: 1.6
      },
      {
        x: 39.5,
        y: 7,
        dir: 4,
        dest: 37.625,
        speed: 1.6
      }],
      8: [{
        x: 39.5,
        y: 4,
        dir: 2,
        dest: 7,
        speed: 1.6
      }],
      9: [{
        x: 39.5,
        y: 4,
        dir: 2,
        dest: 7,
        speed: 1.6
      },
      {
        x: 39.5,
        y: 7,
        dir: 8,
        dest: 41.375,
        speed: 1.6
      }],
      10: [{
        x: 37.6,
        y: 7,
        dir: 8,
        dest: 39.5,
        speed: y
      },
      {
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }],
      11: [{
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }],
      12: [{
        x: 41.4,
        y: 7,
        dir: 4,
        dest: 39.5,
        speed: y
      },
      {
        x: 39.5,
        y: 7,
        dir: 1,
        dest: 4,
        speed: y
      }]
    },
    B = {
      1: {
        actors: [{
          ghost: e,
          x: 64,
          y: 9,
          id: 0
        },
        {
          ghost: a,
          x: 68.2,
          y: 9,
          id: 1
        }],
        sequence: [{
          time: 5.5,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0.78 * 0.8 * 2
          }]
        },
        {
          time: 0.1,
          moves: [{
            dir: 4,
            speed: 32
          },
          {
            dir: 4,
            speed: 0
          }]
        },
        {
          time: 9,
          moves: [{
            dir: 8,
            speed: 0.75 * 0.8 * 2,
            elId: "pcm-bpcm"
          },
          {
            dir: 8,
            speed: 0.8,
            mode: 4
          }]
        }]
      },
      2: {
        actors: [{
          ghost: e,
          x: 64,
          y: 9,
          id: 0
        },
        {
          ghost: a,
          x: 70.2,
          y: 9,
          id: 1
        },
        {
          ghost: a,
          x: 32,
          y: 9.5,
          id: 2
        }],
        sequence: [{
          time: 2.7,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0.78 * 0.8 * 2
          },
          {
            dir: 0,
            speed: 0,
            elId: "pcm-stck"
          }]
        },
        {
          time: 1,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0.1 * 0.8
          },
          {
            dir: 0,
            speed: 0,
            elId: "pcm-stck"
          }]
        },
        {
          time: 1.3,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0
          },
          {
            dir: 0,
            speed: 0,
            elId: "pcm-stck"
          }]
        },
        {
          time: 1,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0,
            elId: "pcm-ghfa"
          },
          {
            dir: 0,
            speed: 0,
            elId: "pcm-stck"
          }]
        },
        {
          time: 2.5,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0,
            elId: "pcm-ghfa"
          },
          {
            dir: 0,
            speed: 0,
            elId: "pcm-stck"
          }]
        }]
      },
      3: {
        actors: [{
          ghost: e,
          x: 64,
          y: 9,
          id: 0
        },
        {
          ghost: a,
          x: 70.2,
          y: 9,
          id: 2
        }],
        sequence: [{
          time: 5.3,
          moves: [{
            dir: 4,
            speed: 0.75 * 0.8 * 2
          },
          {
            dir: 4,
            speed: 0.78 * 0.8 * 2,
            elId: "pcm-ghin"
          }]
        },
        {
          time: 5.3,
          moves: [{
            dir: 4,
            speed: 0
          },
          {
            dir: 8,
            speed: 0.78 * 0.8 * 2,
            elId: "pcm-gbug"
          }]
        }]
      }
    },
    C = [90, 45, 30],
    D = C[0];

