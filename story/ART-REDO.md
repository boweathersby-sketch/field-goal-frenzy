# Season 1 · Art redo list

> **STATUS (Oct 23, 2026): DONE. This list is out of date and kept only for history.** Every Season 1 id in `ART` (story1.js) is on disk: c1–c16 (with c14w/c14l), field, end, jq, wk1–wk5, tx1, tx2, jugwin. Season 2's 27 panels (s2*) are also on disk and wired. No S1/S2 art is missing. The counts and "missing" notes below describe the Oct 19 state.


Stills only (no video, no voice). Each prompt below is ready to paste into **Grok Imagine → Image**, 9:16. Export to `story/<id>.webp`, 540×960, quality around 80. Then add the id to `const ART=new Set([...])` at the top of `story1.js`. Only ids in that set are requested, so missing art never causes a 404.

Canon: BIBLE.md. Coach D is a man. Rae is the mother, 38. Puppy is a female Pomeranian-husky who never speaks. Gus is an active pro. Old Faithful is a beat-up lucky leather football (scuffed brown, worn faded laces, a patch of tape), not a tee. The Week 3 opponent is the Prairie Creek Plowmen.

## Counts

- On disk: **4** (c2, c3, c14w, c16). 3 need a redo (c14w, c2, c3). c16 is a keep: its ball on the hook now matches Old Faithful.
- Missing and wired into the game: **14** (c1, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14l, c15, field). Any earlier gens of these (Coach D drawn as a woman, the Biscuit-era puppy) never landed and must not be reused.
- Missing but optional (not wired yet; jq reuses c2, the week intros reuse field/c10/c13, the text screens are phone UI, and end is drawn with no art): **9**
- **Total to generate: 26** (27 if you touch up c16); 17 of them, plus the c16 you keep, are needed for a fully illustrated S1.

Priority: c14w, c2, c3 (redos), then c1, c14l, c10, c11, c8, c13, field, then the rest.

## c14w — on disk, redo
*Rivalry won: Rae, still in work scrubs, pulls the kicker in over the fence rail under the stadium lights.*

**Status:** REDO. **Issues:** Rae reads as about 25 (bible: 38, tired night-shift mom). The background crowd wears white; the home crowd should be Hawks red and dusty navy.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae leaning over a chain-link fence rail at the edge of the field, pulling the kicker into a hug; the kicker seen from behind (red jersey back, no number, helmet in hand); behind them, blurred bleachers of Hollow Creek fans in red and dusty navy, faces soft and indistinct. Camera: eye-level medium shot from behind the kicker's shoulder. Lighting/time/palette: night, warm stadium floodlights, light mist, amber and red with navy shadows. Rae is the kicker's mother, a woman of 38 with faint tired lines around her eyes, dark hair in a messy bun, blue hospital scrubs-style work uniform. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: white uniforms, a young or glamorous Rae, opposing team colors; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, warped hands, extra fingers, melted faces, the kicker's face, photorealism


## c2 — on disk, redo
*Rae drives home through fog past the smoking paper mill to find the kid already practicing in the yard.*

**Status:** REDO. **Issues:** An American football is flying; the scene says a soccer ball. The milk jug dangles in mid-air from a wire instead of being taped to the clothesline post.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Wide: foreground a small backyard with a milk jug taped to a clothesline post and a soccer ball resting in wet grass; the kicker as a distant silhouette from behind near the post; Rae from behind at the yard gate in scrubs; paper mill chimneys smoking in fog beyond. Camera: eye-level from behind Rae, wide. Lighting/time/palette: dawn, low sun through fog; lavender, dusty rose, amber, gray mill smoke. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering. Add: a black-and-white soccer ball on the grass near the kicker's foot, NOT an American football; the plastic milk jug duct-taped to the wooden clothesline post at waist height, not hanging.
```
Negative / avoid: labels on the jug, motion of the ball, car interior text; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c3 — on disk, redo
*Pop shows the garage wall of pencil height marks and takes down Old Faithful, his beat-up lucky leather football, from a nail.*

**Status:** REDO. **Issues:** Pop is on-model, but Old Faithful is drawn as a paddle/bat shape. It must be a beat-up old leather football (scuffed brown, worn faded laces, a patch of tape).

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop standing beside a wooden garage wall covered in faint unreadable pencil tick marks; a beat-up old leather football (scuffed brown leather, worn faded laces, a patch of tape) hangs in a loop of twine on a nail at his eye level; the kicker's shoulder silhouette in the foreground from behind. Camera: over-the-shoulder from behind the kicker. Lighting/time/palette: late afternoon; single warm bulb plus dusty window beam; browns, amber, faded orange accent. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering. Old Faithful is a beat-up old lucky leather football (scuffed brown leather, worn faded laces, a patch of gray tape), hanging from a nail in a loop of twine. No paddle, no bat, no kicking tee.
```
Negative / avoid: readable pencil names or dates, Pop gripping the ball or a marker; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c16 — on disk, keep (optional touch-up)
*Cliffhanger: a letter under the salt shaker says the mill will close; Rae on the phone through the wall; Old Faithful hangs by the door.*

**Status:** KEEP. Puppy is on-model, and the ball on the hook now fits the canon (Old Faithful is a football). Optional touch-up only if you want it scuffed brown leather with a tape patch; the prompt below does that.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Dim kitchen: a folded blank envelope under a salt shaker on the table in the foreground; Puppy by the back door looking up; Old Faithful, a scuffed old leather football with a patch of tape, hanging in twine on a wall hook by the door; light under a closed door. Camera: low table-level, deep focus. Lighting/time/palette: late night; one hanging bulb, cold window moonlight; brown, amber, cold blue. Puppy is a small fluffy female Pomeranian-husky mix with a thick black, grey and tan coat, pointed ears and husky-like face markings. On the wall hook by the door hangs Old Faithful: a beat-up old leather football, scuffed brown, worn faded laces, a patch of tape, in a loop of twine.
```
Negative / avoid: readable letter or envelope text, people in frame; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c1 — missing (wired)
*Darkness, a heartbeat, a hospital time clock at 5:31 AM: Rae's night shift ends.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae from behind, small in frame, at the end of a long empty hospital corridor, shoulders slumped; a glowing time clock on the wall shown only as a soft blank green light (no digits). Camera: low eye-level, long lens, deep corridor perspective. Lighting/time/palette: pre-dawn 5:30 AM; dim teal fluorescents, one flickering tube; near-black edges, teal and sickly green. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
Negative / avoid: readable clock digits, badge text, patients, nurses' faces; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c4 — missing (wired)
*Coach D gives the nobody-else-showed-up tryout and makes the team walk the field barefoot.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D standing on a practice field, arms crossed, whistle on its cord; the kicker barefoot from behind in the foreground, bare feet in short grass; empty goalposts far away. Camera: low angle at grass level behind the kicker's feet. Lighting/time/palette: late afternoon practice; long shadows; deep navy sky to green field, warm rim light. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: teammates' faces, yard numbers, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c5 — missing (wired)
*Wes Tilly sits alone at the end of the bench, watching the kicker.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Wes alone on the far end of a long empty metal bench, helmet resting on the bench beside him, looking off-frame toward the field; empty bleachers blurred behind. Camera: side profile, medium-wide, shallow depth. Lighting/time/palette: golden hour practice; dusty light; navy, warm gold, field green. Wes Tilly is a quiet, lanky 15-year-old sophomore, shaggy light-brown hair, plain red practice jersey with no number, slouched shoulders.
```
Negative / avoid: other players, helmet logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c6 — missing (wired)
*Thursday night porch: Pop asks what the kicker's pre-kick ritual is.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop seated in an old porch chair, a coffee mug resting on the porch rail beside him with steam; the kicker as a silhouette seated on the porch step, from behind; moths around a porch light. Camera: from behind the kicker, slightly low. Lighting/time/palette: night; one warm yellow porch light against deep blue night; amber, navy. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: Pop holding the mug, house numbers; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c7 — missing (wired)
*After the first game Jojo does a 'sideline report' and a muddy stray puppy, Puppy, sits on the kicker's cleats.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Jojo grinning with a hairbrush tucked in the hoodie pocket; Puppy sitting on top of a pair of muddy cleats (the kicker's feet, feet only) in the foreground; stadium lights behind as soft bokeh. Camera: low angle near ground, puppy in foreground. Lighting/time/palette: night after the game; stadium lights bokeh; navy, warm white, grass green. Jojo is a 9-year-old with a shaggy dark bowl cut, oversized plain red hoodie, gap-toothed grin, gender-neutral look. Puppy is a small fluffy female Pomeranian-husky mix with a thick black, grey and tan coat, pointed ears and husky-like face markings. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: crowd faces, Jojo holding the hairbrush up, a second dog; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c8 — missing (wired)
*On nights Rae can't come, she watches from the hospital break room on a cracked phone propped on a mop bucket.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae seated alone in a dim break room, leaning toward a cracked phone propped on a mop bucket; the phone screen is only a soft green-white glow, no image; vending machine glow behind, blurred. Camera: eye-level, medium close, from slightly behind Rae. Lighting/time/palette: late night; screen glow on her face, teal break-room light; teal, cool green, warm skin highlights. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
Negative / avoid: readable screen, other nurses' faces (keep any others out), hand gripping phone; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c9 — missing (wired)
*A free clinic: pro legend Gus Hollander walks over and offers one question.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Gus standing on a sunny practice field, arms folded, looking down kindly; the kicker in the foreground from behind; a few footballs resting on the grass. Camera: low angle from behind the kicker. Lighting/time/palette: bright Saturday morning; clear blue to pale gold; crisp greens. Gus Hollander is a broad active pro kicker of 36, short beard going early gray at the chin, plain green ball cap with no logo, faded gray windbreaker. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: cap logos, crowds, signage; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c10 — missing (wired)
*The Fog Game: mist so thick the uprights vanish; Coach D says to feel it.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker as a silhouette from behind facing a wall of fog; the faint ghost shape of goalposts barely visible; Coach D a dim silhouette at the side. Camera: low behind the kicker, wide. Lighting/time/palette: night game in thick fog; stadium lights diffused into glowing halos; gray, pale silver, muted green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: crowd, scoreboard, clear posts; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c11 — missing (wired)
*Pop almost tells a secret about kicking in fog, then teaches 'three breaths.'*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop alone on the porch steps, gazing out into foggy night, mug resting on the step beside him with steam, face half lit and pensive. Camera: medium close, three-quarter profile. Lighting/time/palette: late night, fog around the porch light; amber against gray-blue. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap.
```
Negative / avoid: Pop holding the mug, a second figure; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c12 — missing (wired)
*Road game at Ironwood: loud crowd, lumpy field, 4th and 6 — Coach D: 'Your call.'*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D on the sideline turning to look at the kicker, who stands from behind in the foreground; blurred hostile stadium lights and dark blurred stands behind. Camera: over-the-shoulder from behind the kicker. Lighting/time/palette: night road game; harsh white stadium light, orange hostile glow; navy, orange, green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: crowd faces, fox mascot logo, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c13 — missing (wired)
*Rivalry week: Dez Calloway mocks Old Faithful at midfield.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Midfield at warm-ups: Dez standing with a smirk looking down; Old Faithful (a beat-up old leather football, scuffed brown, worn laces, patch of tape) resting on the grass between them; kicker from behind in foreground. Camera: low angle at grass level with the old ball in focus. Lighting/time/palette: dusk warm-ups; red-orange sky behind floodlights; deep red, silver, gold. Dez Calloway is a confident 16-year-old rival kicker, close-cropped dark hair, plain silver-and-black warm-up jacket with no lettering, smirking. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: a filming dad, a camera, midfield logo, opposing logo; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c14l — missing (wired)
*Rivalry lost: rain, quiet; Rae at the fence says she's never been prouder of a quiet.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae at the chain-link fence in light rain, scrubs damp, soft proud expression, leaning over the rail with open arms; empty dark field behind. Camera: eye-level medium close. Lighting/time/palette: night rain under stadium lights; cool blue-gray with one warm light on Rae. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
Negative / avoid: opposing team celebration, faces in stands; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## c15 — missing (wired)
*The moment freezes into a scrapbook polaroid.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty white-bordered instant photo resting on a wooden table, the photo showing a soft-focus silhouette of the kicker from behind under stadium lights; blank caption strip. Camera: top-down, slightly angled. Lighting/time/palette: warm lamp light; sepia, amber, faded red. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: writing on the caption strip, hands holding the photo; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## field — missing (wired)
*Story Mode home and Create-Your-Kicker backdrop: the Hollow Creek High field.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty small-town high school football field at dusk, plain goalposts, old wooden bleachers empty, paper mill chimneys and water tower silhouetted beyond. Camera: wide, low from the end zone. Lighting/time/palette: dusk; navy to amber sky; field green; red accents.
```
Negative / avoid: yard numbers, water tower text, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## jq — missing (optional)
*Rae dares the kid: three milk jugs in a row from twenty yards, like Grandpa used to.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Close medium: Rae leaning on the clothesline post with a teasing half-smile, the milk jug taped at her shoulder height; the kicker's cleats and a soccer ball at the bottom edge of frame (feet only). Camera: low angle from the kicker's point of view. Lighting/time/palette: early morning, soft golden backlight, dew sparkle; amber, sage, pale blue. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: jug labels, Rae holding anything; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## end — missing (optional)
*Season 1 end screen: 'To be continued…' — the mill's future and the kicker's future both uncertain.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker as a silhouette from behind standing on the empty field at night, looking at the distant paper mill with dark chimneys; one floodlight on. Camera: wide, low behind the kicker. Lighting/time/palette: night; single cold floodlight, distant mill; navy, cold gray, faint amber. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: text, crowd; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## wk1 — missing (optional)
*Week 1 intro: first varsity game, the whole town in the bleachers, band slightly out of tune.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker from behind at the tunnel edge looking onto a lit field; bleachers as soft warm bokeh only; band instruments glinting far away blurred. Camera: behind the kicker, low. Lighting/time/palette: Friday night; golden floodlights against navy sky; red, gold, navy. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
Negative / avoid: crowd faces, scoreboard, opponent logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## wk2 — missing (optional)
*Week 2 intro: Coach D sets the goal of three field goals from 30+.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D on the sideline at night, arms crossed, looking toward the goalposts; empty bench behind. Camera: medium, three-quarter profile. Lighting/time/palette: Friday night floodlights; navy, white, green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture.
```
Negative / avoid: clipboard writing, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## wk3 — missing (optional)
*Week 3 intro: The Fog Game at Prairie Creek.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty field swallowed by fog, goalposts a ghost outline, floodlights as glowing halos. Camera: wide, low. Lighting/time/palette: night fog; gray-silver, muted green.
```
Negative / avoid: crowd, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## wk4 — missing (optional)
*Week 4 intro: road game at Ironwood, lumpy field, loud crowd; Pop drove separately to be there.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop alone at the far end of a dark visiting bleacher, small, in blur-free focus, with the rest of the stands an orange blurred glow; lumpy field below. Camera: wide from field level looking up. Lighting/time/palette: night; harsh orange stadium light; orange, navy, green. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap.
```
Negative / avoid: crowd faces, fox logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## wk5 — missing (optional)
*Week 5 intro: Rivalry Night — eleven straight losses; Rae arrives at halftime from a double shift.*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae seen from behind, standing still at the stadium gate in scrubs, looking toward the bright field; floodlights ahead, red banners without text blurred. Camera: behind Rae, low. Lighting/time/palette: night; blazing floodlights, red haze; red, gold, navy. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
Negative / avoid: Rae walking, crowd faces, banner text; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## tx1 — missing (optional)
*Between-games texts after Week 1 (Rae, Coach D, Wes).*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. A quiet bedroom at night: a phone face-up on a nightstand glowing with a soft blank light, a red jersey draped over a chair, window showing distant stadium lights fading. Camera: eye-level medium. Lighting/time/palette: late night; phone glow, moonlight; navy, soft blue, warm lamp.
```
Negative / avoid: readable screen, notifications, jersey numbers; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore


## tx2 — missing (optional)
*Between-games texts after the Fog Game (Jojo, Tank, Rae).*

**Status:** missing. Generate it fresh.

```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. A kitchen counter at night: a phone glowing (blank) next to a coffee mug and an open scrapbook with blank pages; fog outside the window. Camera: slightly high angle. Lighting/time/palette: late night; fog-gray window, warm under-cabinet light.
```
Negative / avoid: writing in scrapbook, readable screen; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

