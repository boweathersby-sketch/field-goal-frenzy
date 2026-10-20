# Field Goal Frenzy · Story Mode Season 1 · Grok Imagine Shot List

Workflow: generate the IMAGE first (9:16), pick the cleanest, then animate it into a 6-second VIDEO using the motion prompt. Save as `story/<id>.webp` (+ `<id>.mp4`). `jq` currently reuses `c2` art in code; its own shot is optional.

## ▶ READY TO PASTE FIRST · c14w (Rae at the fence) — for Kirk's approval

1) IMAGE (9:16):
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae at a chain-link fence by the field, scrubs, hands resting on the fence top, tearful smile; behind her slow red confetti and blurred celebrating field lights. Camera: eye-level medium close, Rae centered. Lighting/time/palette: night; warm stadium light, red confetti; red, gold, navy. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
2) VIDEO WITH AUDIO (animate that image, 8 s):
```
slow confetti falls; light bokeh shimmers; Rae's loose hair moves; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (crying and laughing at once, breathless) "I didn't even see it... I just heard it." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: roaring crowd washing in from behind, marching band fanfare, slow fluttering confetti, chain-link fence rattling. No music with lyrics, no narrator, no on-screen text or subtitles.
```
Avoid: crowd faces, fireworks with shapes, trophies with engraving; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

Voices for every character: see `story/VOICES.md`.

---
## Style line (identical in every prompt)
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere.

## Character sheet (verbatim)
- Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap.
- Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
- The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
- Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture.
- Wes Tilly is a quiet, lanky 15-year-old sophomore, shaggy light-brown hair, plain red practice jersey with no number, slouched shoulders.
- Jojo is a 9-year-old with a shaggy dark bowl cut, oversized plain red hoodie, gap-toothed grin, gender-neutral look.
- Puppy is a small fluffy female Pomeranian-husky mix with a thick black, grey and tan coat, pointed ears and husky-like face markings.
- Dez Calloway is a confident 16-year-old rival kicker, close-cropped dark hair, plain silver-and-black warm-up jacket with no lettering, smirking.
- Gus Hollander is a broad active pro kicker of 36, short beard going early gray at the chin, plain green ball cap with no logo, faded gray windbreaker.

## Global avoid (append to every prompt)
text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

## Hard rules
- Puppy never speaks or lip-syncs: her mouth stays closed except for panting or a yawn; only humans speak. Any shot with Puppy plus an offscreen voice must say "the dog's mouth stays closed, the voice comes from offscreen".
- No crowds with visible faces (blur/bokeh/empty stands). - No hands gripping small objects (objects on surfaces or nails). - Video motion only: camera push-in/pan, fog, steam, light flicker, dust, rain, slow confetti, flags, hair in wind; no running or kicking. - No text, numbers, logos or real team names; plain red Hollow Creek Hawks jerseys with no numbers. - One or two figures max (a puppy counts as small background presence in c7).

## Priority order (most emotional first)
1. c14w
2. c14l
3. c16
4. c3
5. c11
6. c2
7. c8
8. c1
9. c10
10. jq
11. c7
12. c6
13. c13
14. c15
15. end
16. c12
17. c5
18. c4
19. c9
20. field
21. wk5
22. wk3
23. wk1
24. wk4
25. wk2
26. tx1
27. tx2

---
## c1
**Beat:** Darkness, a heartbeat, a hospital time clock at 5:31 AM: Rae's night shift ends.  
**Emotion:** quiet exhaustion, loneliness

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae from behind, small in frame, at the end of a long empty hospital corridor, shoulders slumped; a glowing time clock on the wall shown only as a soft blank green light (no digits). Camera: low eye-level, long lens, deep corridor perspective. Lighting/time/palette: pre-dawn 5:30 AM; dim teal fluorescents, one flickering tube; near-black edges, teal and sickly green. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
**VIDEO motion prompt (6 s):**
```
slow push-in down the corridor; one fluorescent tube flickers twice; faint dust drifts in the light. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in down the corridor; one fluorescent tube flickers twice; faint dust drifts in the light. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (quiet sigh, to herself) "Another one done." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: slow heartbeat monitor beep, fluorescent hum, distant hospital hallway echo. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** readable clock digits, badge text, patients, nurses' faces; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c2
**Beat:** Rae drives home through fog past the smoking paper mill to find the kid already practicing in the yard.  
**Emotion:** bittersweet small-town dawn, pride mixed with worry

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Wide: foreground a small backyard with a milk jug taped to a clothesline post and a soccer ball resting in wet grass; the kicker as a distant silhouette from behind near the post; Rae from behind at the yard gate in scrubs; paper mill chimneys smoking in fog beyond. Camera: eye-level from behind Rae, wide. Lighting/time/palette: dawn, low sun through fog; lavender, dusty rose, amber, gray mill smoke. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow pan right toward the mill; chimney smoke rises; fog drifts across the yard. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow pan right toward the mill; chimney smoke rises; fog drifts across the yard. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (soft, through a smile) "They cut the soccer program... and you were the best one on it." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: car engine idling, distant mill whistle, morning birds, dull thump of a ball on plastic. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** labels on the jug, motion of the ball, car interior text; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## jq
**Beat:** Rae dares the kid: three milk jugs in a row from twenty yards, like Grandpa used to.  
**Emotion:** playful challenge, warmth

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Close medium: Rae leaning on the clothesline post with a teasing half-smile, the milk jug taped at her shoulder height; the kicker's cleats and a soccer ball at the bottom edge of frame (feet only). Camera: low angle from the kicker's point of view. Lighting/time/palette: early morning, soft golden backlight, dew sparkle; amber, sage, pale blue. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow push-in on Rae; her loose hair strands move in breeze; the jug sways slightly on its tape. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in on Rae; her loose hair strands move in breeze; the jug sways slightly on its tape. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (teasing) "Twenty yards. Three in a row. Bet you can't." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: backyard morning birds, breeze in the clothesline, jug creaking on its tape. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** jug labels, Rae holding anything; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c3
**Beat:** Pop shows the garage wall of pencil height marks and takes down Old Faithful, his beat-up lucky leather football, from a nail.  
**Emotion:** inheritance, family history, tenderness

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop standing beside a wooden garage wall covered in faint unreadable pencil tick marks; a beat-up old leather football (scuffed brown leather, worn faded laces, a patch of tape) hangs in a loop of twine on a nail at his eye level; the kicker's shoulder silhouette in the foreground from behind. Camera: over-the-shoulder from behind the kicker. Lighting/time/palette: late afternoon; single warm bulb plus dusty window beam; browns, amber, faded orange accent. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow push-in toward the old ball on the nail; dust drifts in the window light; the bulb sways gently. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in toward the old ball on the nail; dust drifts in the window light; the bulb sways gently. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Pop speaks (elderly man in his late 70s, low gravelly baritone, rough and grainy, slow Appalachian-Midwest drawl, long pauses between phrases, gruff on top with quiet warmth underneath): "This is Old Faithful. Older than your mother's car. One line, kid. Why you kick." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: garage bulb buzz, creaking wood, dust settling, distant dog bark. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** readable pencil names or dates, Pop gripping the ball or a marker; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c4
**Beat:** Coach D gives the nobody-else-showed-up tryout and makes the team walk the field barefoot.  
**Emotion:** humility, nervous hope

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D standing on a practice field, arms crossed, whistle on its cord; the kicker barefoot from behind in the foreground, bare feet in short grass; empty goalposts far away. Camera: low angle at grass level behind the kicker's feet. Lighting/time/palette: late afternoon practice; long shadows; deep navy sky to green field, warm rim light. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow tilt up from bare feet in grass to Coach D; grass blades move in wind. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow tilt up from bare feet in grass to Coach D; grass blades move in wind. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Coach D (Darnell Okafor) speaks (Black man in his mid-40s, deep resonant bass-baritone, smooth and controlled, Southern-tinged Midwestern accent, measured clipped pace, calm authority that rarely rises, dry humor): "Shoes off. Everybody. Feel every yard you kick for." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: whistle chirp, wind across an empty practice field, distant teammates murmuring. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** teammates' faces, yard numbers, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c5
**Beat:** Wes Tilly sits alone at the end of the bench, watching the kicker.  
**Emotion:** loneliness, a possible friendship

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Wes alone on the far end of a long empty metal bench, helmet resting on the bench beside him, looking off-frame toward the field; empty bleachers blurred behind. Camera: side profile, medium-wide, shallow depth. Lighting/time/palette: golden hour practice; dusty light; navy, warm gold, field green. Wes Tilly is a quiet, lanky 15-year-old sophomore, shaggy light-brown hair, plain red practice jersey with no number, slouched shoulders.
```
**VIDEO motion prompt (6 s):**
```
slow lateral pan along the bench to Wes; dust in the light; his hair moves in breeze. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow lateral pan along the bench to Wes; dust in the light; his hair moves in breeze. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Wes Tilly speaks (15-year-old boy, soft light tenor with occasional crack, mumbly, slow and shy pace, hesitant, almost whispering): (barely audible) "...Nice kick." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: empty bleachers creaking, distant practice whistles, soft wind. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** other players, helmet logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c6
**Beat:** Thursday night porch: Pop asks what the kicker's pre-kick ritual is.  
**Emotion:** intimacy, mentorship

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop seated in an old porch chair, a coffee mug resting on the porch rail beside him with steam; the kicker as a silhouette seated on the porch step, from behind; moths around a porch light. Camera: from behind the kicker, slightly low. Lighting/time/palette: night; one warm yellow porch light against deep blue night; amber, navy. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
steam rises from the mug; moths flicker around the light; very slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
steam rises from the mug; moths flicker around the light; very slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Pop speaks (elderly man in his late 70s, low gravelly baritone, rough and grainy, slow Appalachian-Midwest drawl, long pauses between phrases, gruff on top with quiet warmth underneath): "Every great kicker has a thing they do. Every time. What's yours?" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: crickets, porch boards creaking, coffee mug set down on wood. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** Pop holding the mug, house numbers; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c7
**Beat:** After the first game Jojo does a 'sideline report' and a muddy stray puppy, Puppy, sits on the kicker's cleats.  
**Emotion:** joy, comic relief, family

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Jojo grinning with a hairbrush tucked in the hoodie pocket; Puppy sitting on top of a pair of muddy cleats (the kicker's feet, feet only) in the foreground; stadium lights behind as soft bokeh. Camera: low angle near ground, puppy in foreground. Lighting/time/palette: night after the game; stadium lights bokeh; navy, warm white, grass green. Jojo is a 9-year-old with a shaggy dark bowl cut, oversized plain red hoodie, gap-toothed grin, gender-neutral look. Puppy is a small fluffy female Pomeranian-husky mix with a thick black, grey and tan coat, pointed ears and husky-like face markings. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
stadium light bokeh shimmers; Puppy's ears flop in the breeze; Jojo's hair moves; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
stadium light bokeh shimmers; Puppy's ears flop in the breeze; Jojo's hair moves; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Jojo speaks (9-year-old child, high bright gender-neutral voice, a little raspy from yelling, fast excited pace that tumbles over itself, giggly and dramatic): "Sideline report! What did the ball feel like?" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: post-game crowd murmur in the distance, marching band packing up, puppy panting. No music with lyrics, no narrator, no on-screen text or subtitles. The dog's mouth stays closed, the voice comes from offscreen; Puppy never speaks or lip-syncs: her mouth stays closed except for panting or a yawn; only humans speak.
```
**Avoid:** crowd faces, Jojo holding the hairbrush up, a second dog; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c8
**Beat:** On nights Rae can't come, she watches from the hospital break room on a cracked phone propped on a mop bucket.  
**Emotion:** longing, sacrifice

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae seated alone in a dim break room, leaning toward a cracked phone propped on a mop bucket; the phone screen is only a soft green-white glow, no image; vending machine glow behind, blurred. Camera: eye-level, medium close, from slightly behind Rae. Lighting/time/palette: late night; screen glow on her face, teal break-room light; teal, cool green, warm skin highlights. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
**VIDEO motion prompt (6 s):**
```
the phone glow flickers softly on her face; slow push-in; a ceiling light hums and flickers. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
the phone glow flickers softly on her face; slow push-in; a ceiling light hums and flickers. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (whispering to the phone) "I'll be watching. Promise." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: tinny game broadcast from a cracked phone, vending machine hum, nurses hushing each other. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** readable screen, other nurses' faces (keep any others out), hand gripping phone; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c9
**Beat:** A free clinic: pro legend Gus Hollander walks over and offers one question.  
**Emotion:** awe, opportunity

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Gus standing on a sunny practice field, arms folded, looking down kindly; the kicker in the foreground from behind; a few footballs resting on the grass. Camera: low angle from behind the kicker. Lighting/time/palette: bright Saturday morning; clear blue to pale gold; crisp greens. Gus Hollander is a broad active pro kicker of 36, short beard going early gray at the chin, plain green ball cap with no logo, faded gray windbreaker. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow push-in on Gus; his windbreaker ripples; dust motes in sunlight. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in on Gus; his windbreaker ripples; dust motes in sunlight. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Gus Hollander speaks (man in his late 30s, big booming warm baritone, slightly hoarse, plain Great Lakes accent, confident relaxed pace, kindly but no-nonsense): "You get one question, kid. Make it good." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: open-field wind, balls thumping in the distance, a clipboard rattle. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** cap logos, crowds, signage; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c10
**Beat:** The Fog Game: mist so thick the uprights vanish; Coach D says to feel it.  
**Emotion:** eerie suspense, trust

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker as a silhouette from behind facing a wall of fog; the faint ghost shape of goalposts barely visible; Coach D a dim silhouette at the side. Camera: low behind the kicker, wide. Lighting/time/palette: night game in thick fog; stadium lights diffused into glowing halos; gray, pale silver, muted green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
heavy fog rolls across the field; light halos pulse softly; extremely slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
heavy fog rolls across the field; light halos pulse softly; extremely slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Coach D (Darnell Okafor) speaks (Black man in his mid-40s, deep resonant bass-baritone, smooth and controlled, Southern-tinged Midwestern accent, measured clipped pace, calm authority that rarely rises, dry humor): (low, steady) "You can't see it, so feel it." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: muffled crowd lost in fog, foghorn-like stadium hum, damp wind. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd, scoreboard, clear posts; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c11
**Beat:** Pop almost tells a secret about kicking in fog, then teaches 'three breaths.'  
**Emotion:** mystery, quiet wisdom

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop alone on the porch steps, gazing out into foggy night, mug resting on the step beside him with steam, face half lit and pensive. Camera: medium close, three-quarter profile. Lighting/time/palette: late night, fog around the porch light; amber against gray-blue. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap.
```
**VIDEO motion prompt (6 s):**
```
steam and fog drift; porch light flickers once; slow push-in on Pop's face. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
steam and fog drift; porch light flickers once; slow push-in on Pop's face. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Pop speaks (elderly man in his late 70s, low gravelly baritone, rough and grainy, slow Appalachian-Midwest drawl, long pauses between phrases, gruff on top with quiet warmth underneath): (pausing) "I kicked in fog like that once." (beat) "Three breaths, kid. One. Two. Three. Then swing." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: night crickets, porch light buzzing, slow exhale. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** Pop holding the mug, a second figure; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c12
**Beat:** Road game at Ironwood: loud crowd, lumpy field, 4th and 6 — Coach D: 'Your call.'  
**Emotion:** pressure, a moment of choice

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D on the sideline turning to look at the kicker, who stands from behind in the foreground; blurred hostile stadium lights and dark blurred stands behind. Camera: over-the-shoulder from behind the kicker. Lighting/time/palette: night road game; harsh white stadium light, orange hostile glow; navy, orange, green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
light bokeh pulses; Coach D's windbreaker flutters; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
light bokeh pulses; Coach D's windbreaker flutters; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Coach D (Darnell Okafor) speaks (Black man in his mid-40s, deep resonant bass-baritone, smooth and controlled, Southern-tinged Midwestern accent, measured clipped pace, calm authority that rarely rises, dry humor): "Forty yards. Your call." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: hostile road crowd chanting in the distance, stomping bleachers, wind. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd faces, fox mascot logo, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c13
**Beat:** Rivalry week: Dez Calloway mocks Old Faithful at midfield.  
**Emotion:** provocation, underdog fire

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Midfield at warm-ups: Dez standing with a smirk looking down; Old Faithful (a beat-up old leather football, scuffed brown, worn laces, patch of tape) resting on the grass between them; kicker from behind in foreground. Camera: low angle at grass level with the old ball in focus. Lighting/time/palette: dusk warm-ups; red-orange sky behind floodlights; deep red, silver, gold. Dez Calloway is a confident 16-year-old rival kicker, close-cropped dark hair, plain silver-and-black warm-up jacket with no lettering, smirking. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow push-in toward the old ball; floodlights flare; wind moves grass and Dez's jacket. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in toward the old ball; floodlights flare; wind moves grass and Dez's jacket. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Dez Calloway (rival) speaks (16-year-old boy, clear smooth tenor, polished suburban accent, quick smug sing-song pace, cocky and amused): (smirking) "Cute ball. Did your grandpa find it in a museum?" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: pre-game crowd buzz, camcorder whir, warm-up footballs thudding. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** a filming dad, a camera, midfield logo, opposing logo; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c14w
**Beat:** Rivalry won: the field floods, and Rae stands alone at the fence in scrubs, crying and laughing.  
**Emotion:** overwhelming joy and gratitude

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae at a chain-link fence by the field, scrubs, hands resting on the fence top, tearful smile; behind her slow red confetti and blurred celebrating field lights. Camera: eye-level medium close, Rae centered. Lighting/time/palette: night; warm stadium light, red confetti; red, gold, navy. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
**VIDEO motion prompt (6 s):**
```
slow confetti falls; light bokeh shimmers; Rae's loose hair moves; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow confetti falls; light bokeh shimmers; Rae's loose hair moves; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (crying and laughing at once, breathless) "I didn't even see it... I just heard it." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: roaring crowd washing in from behind, marching band fanfare, slow fluttering confetti, chain-link fence rattling. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd faces, fireworks with shapes, trophies with engraving; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c14l
**Beat:** Rivalry lost: rain, quiet; Rae at the fence says she's never been prouder of a quiet.  
**Emotion:** tender heartbreak, unconditional love

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae at the chain-link fence in light rain, scrubs damp, soft proud expression, leaning over the rail with open arms; empty dark field behind. Camera: eye-level medium close. Lighting/time/palette: night rain under stadium lights; cool blue-gray with one warm light on Rae. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
**VIDEO motion prompt (6 s):**
```
rain falls in light streaks; puddle ripples; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
rain falls in light streaks; puddle ripples; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (soft, steady, loving) "I heard the whole place go quiet... I've never been prouder of a quiet." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: steady rain on the fence and turf, faraway rival cheers, low wind. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** opposing team celebration, faces in stands; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c15
**Beat:** The moment freezes into a scrapbook polaroid.  
**Emotion:** nostalgia, memory

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty white-bordered instant photo resting on a wooden table, the photo showing a soft-focus silhouette of the kicker from behind under stadium lights; blank caption strip. Camera: top-down, slightly angled. Lighting/time/palette: warm lamp light; sepia, amber, faded red. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
the photo slowly develops (image fades in); gentle lamp flicker; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
the photo slowly develops (image fades in); gentle lamp flicker; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Jojo speaks (9-year-old child, high bright gender-neutral voice, a little raspy from yelling, fast excited pace that tumbles over itself, giggly and dramatic): (whispering, careful) "Okay... caption time. Make it good." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: camera shutter click, page turning, soft room tone. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** writing on the caption strip, hands holding the photo; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## c16
**Beat:** Cliffhanger: a letter under the salt shaker says the mill will close; Rae on the phone through the wall; Old Faithful hangs by the door.  
**Emotion:** dread, uncertainty

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Dim kitchen: a folded blank envelope under a salt shaker on the table in the foreground; Puppy by the back door looking up; Old Faithful, a scuffed old leather football with a patch of tape, hanging in twine on a wall hook by the door; light under a closed door. Camera: low table-level, deep focus. Lighting/time/palette: late night; one hanging bulb, cold window moonlight; brown, amber, cold blue. Puppy is a small fluffy female Pomeranian-husky mix with a thick black, grey and tan coat, pointed ears and husky-like face markings.
```
**VIDEO motion prompt (6 s):**
```
the bulb sways slightly; shadow shifts; Puppy's ears twitch; slow push-in toward the old ball. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
the bulb sways slightly; shadow shifts; Puppy's ears twitch; slow push-in toward the old ball. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (muffled through the wall) "If the kid has to quit football to work, then that's what—" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: phone line cutting off, refrigerator hum, puppy whining at the door. No music with lyrics, no narrator, no on-screen text or subtitles. The dog's mouth stays closed, the voice comes from offscreen; Puppy never speaks or lip-syncs: her mouth stays closed except for panting or a yawn; only humans speak.
```
**Avoid:** readable letter or envelope text, people in frame; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## tx1
**Beat:** Between-games texts after Week 1 (Rae, Coach D, Wes).  
**Emotion:** warm afterglow

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. A quiet bedroom at night: a phone face-up on a nightstand glowing with a soft blank light, a red jersey draped over a chair, window showing distant stadium lights fading. Camera: eye-level medium. Lighting/time/palette: late night; phone glow, moonlight; navy, soft blue, warm lamp.
```
**VIDEO motion prompt (6 s):**
```
the phone glow pulses gently; curtain moves; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
the phone glow pulses gently; curtain moves; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Rae speaks (woman in her mid-30s, warm mid-low alto, slightly husky and tired from night shifts, soft rural Midwestern accent, unhurried pace, emotion swings from dry teasing to breaking-voice tenderness): (voice-over, glowing) "Watched it on the break room phone. The nurses screamed." Coach D (Darnell Okafor) speaks (Black man in his mid-40s, deep resonant bass-baritone, smooth and controlled, Southern-tinged Midwestern accent, measured clipped pace, calm authority that rarely rises, dry humor): (voice-over) "Film at seven. Bring Old Faithful." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: phone buzz notifications, quiet bedroom night. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** readable screen, notifications, jersey numbers; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## tx2
**Beat:** Between-games texts after the Fog Game (Jojo, Tank, Rae).  
**Emotion:** anticipation, family strain

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. A kitchen counter at night: a phone glowing (blank) next to a coffee mug and an open scrapbook with blank pages; fog outside the window. Camera: slightly high angle. Lighting/time/palette: late night; fog-gray window, warm under-cabinet light.
```
**VIDEO motion prompt (6 s):**
```
fog drifts outside; phone glow pulses; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
fog drifts outside; phone glow pulses; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Jojo speaks (9-year-old child, high bright gender-neutral voice, a little raspy from yelling, fast excited pace that tumbles over itself, giggly and dramatic): (voice-over) "Scrapbook page three is YOU in the fog!" Tank Teague speaks (17-year-old boy, loud deep chesty voice, laid-back Southern drawl, slow and goofy, big laugh): (voice-over) "Road trip to Ironwood. Bring snacks or walk." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: phone buzz notifications, school bus engine rumble. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** writing in scrapbook, readable screen; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## wk1
**Beat:** Week 1 intro: first varsity game, the whole town in the bleachers, band slightly out of tune.  
**Emotion:** electric first-night nerves

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker from behind at the tunnel edge looking onto a lit field; bleachers as soft warm bokeh only; band instruments glinting far away blurred. Camera: behind the kicker, low. Lighting/time/palette: Friday night; golden floodlights against navy sky; red, gold, navy. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
floodlight bokeh shimmers; flags on the goalposts ripple; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
floodlight bokeh shimmers; flags on the goalposts ripple; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: PA announcer speaks (stadium PA announcer, man in his 50s, bright nasal baritone, small-town Midwestern twang, booming drawn-out delivery with natural stadium echo, folksy enthusiasm): "Welcome to Friday night in Hollow Creek! Here come your Hawks!" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: crowd cheering in the distance, slightly out-of-tune marching band, stadium lights humming. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd faces, scoreboard, opponent logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## wk2
**Beat:** Week 2 intro: Coach D sets the goal of three field goals from 30+.  
**Emotion:** determination

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Coach D on the sideline at night, arms crossed, looking toward the goalposts; empty bench behind. Camera: medium, three-quarter profile. Lighting/time/palette: Friday night floodlights; navy, white, green. Coach D (Darnell Okafor) is a Black man in his 40s, short cropped hair and a trimmed beard, plain navy windbreaker, whistle on a cord around his neck, calm stern posture.
```
**VIDEO motion prompt (6 s):**
```
windbreaker flutters; light flickers; slow pan. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
windbreaker flutters; light flickers; slow pan. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Coach D (Darnell Okafor) speaks (Black man in his mid-40s, deep resonant bass-baritone, smooth and controlled, Southern-tinged Midwestern accent, measured clipped pace, calm authority that rarely rises, dry humor): "Three from thirty-plus tonight. I want all three." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: crowd buzz, wind, helmets clacking on the sideline. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** clipboard writing, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## wk3
**Beat:** Week 3 intro: The Fog Game at Prairie Creek.  
**Emotion:** eerie unknown

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty field swallowed by fog, goalposts a ghost outline, floodlights as glowing halos. Camera: wide, low. Lighting/time/palette: night fog; gray-silver, muted green.
```
**VIDEO motion prompt (6 s):**
```
fog rolls; halos breathe; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
fog rolls; halos breathe; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: PA announcer speaks (stadium PA announcer, man in his 50s, bright nasal baritone, small-town Midwestern twang, booming drawn-out delivery with natural stadium echo, folksy enthusiasm): (muffled through fog) "Folks... we can barely see the field tonight." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: thick fog hush, muffled crowd, distant drum. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## wk4
**Beat:** Week 4 intro: road game at Ironwood, lumpy field, loud crowd; Pop drove separately to be there.  
**Emotion:** hostile pressure, quiet support

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Pop alone at the far end of a dark visiting bleacher, small, in blur-free focus, with the rest of the stands an orange blurred glow; lumpy field below. Camera: wide from field level looking up. Lighting/time/palette: night; harsh orange stadium light; orange, navy, green. Pop is a weathered grandfather in his 70s, short white stubble, red-and-black flannel, a worn cap.
```
**VIDEO motion prompt (6 s):**
```
light bokeh pulses; Pop's cap brim in wind; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
light bokeh pulses; Pop's cap brim in wind; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: PA announcer speaks (stadium PA announcer, man in his 50s, bright nasal baritone, small-town Midwestern twang, booming drawn-out delivery with natural stadium echo, folksy enthusiasm): (away crowd booing over him) "The Hawks come to Ironwood tonight..." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: loud hostile crowd, stomping metal bleachers. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** crowd faces, fox logos; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## wk5
**Beat:** Week 5 intro: Rivalry Night — eleven straight losses; Rae arrives at halftime from a double shift.  
**Emotion:** everything on the line

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. Rae seen from behind, standing still at the stadium gate in scrubs, looking toward the bright field; floodlights ahead, red banners without text blurred. Camera: behind Rae, low. Lighting/time/palette: night; blazing floodlights, red haze; red, gold, navy. Rae is the kicker's mother, a woman of 38, dark hair in a messy bun, blue hospital scrubs-style work uniform.
```
**VIDEO motion prompt (6 s):**
```
red pennants ripple; floodlights flare; slow push-in past Rae. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
red pennants ripple; floodlights flare; slow push-in past Rae. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: PA announcer speaks (stadium PA announcer, man in his 50s, bright nasal baritone, small-town Midwestern twang, booming drawn-out delivery with natural stadium echo, folksy enthusiasm): "Eleven years, folks. Eleven years. It's Rivalry Night!" Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: packed crowd roar, drumline, fireworks pops in the distance. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** Rae walking, crowd faces, banner text; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## field
**Beat:** Story Mode home and Create-Your-Kicker backdrop: the Hollow Creek High field.  
**Emotion:** hometown pride, promise

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. An empty small-town high school football field at dusk, plain goalposts, old wooden bleachers empty, paper mill chimneys and water tower silhouetted beyond. Camera: wide, low from the end zone. Lighting/time/palette: dusk; navy to amber sky; field green; red accents.
```
**VIDEO motion prompt (6 s):**
```
clouds drift; chimney smoke rises; floodlights flicker on; slow push-in. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
clouds drift; chimney smoke rises; floodlights flicker on; slow push-in. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: No dialogue. AMBIENT SOUND: Friday-night crowd murmur, stadium lights humming, distant marching band warm-up. No music with lyrics, no narrator, no on-screen text or subtitles.
```
**Avoid:** yard numbers, water tower text, scoreboard; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore

---
## end
**Beat:** Season 1 end screen: 'To be continued…' — the mill's future and the kicker's future both uncertain.  
**Emotion:** haunting cliffhanger

**IMAGE prompt:**
```
STYLE: painted cinematic illustration, visible soft brushwork, Americana small-town realism, muted film palette (dusty navy, faded rust, warm amber, mill-town gray-green), soft film grain, gentle volumetric light, 9:16 vertical portrait, story-game key art, no text anywhere. The kicker as a silhouette from behind standing on the empty field at night, looking at the distant paper mill with dark chimneys; one floodlight on. Camera: wide, low behind the kicker. Lighting/time/palette: night; single cold floodlight, distant mill; navy, cold gray, faint amber. The player's kicker is custom-made, so never show their face: show them from behind, as a silhouette, or as hands and feet only. Kicker wears a plain red Hollow Creek Hawks jersey with no numbers or lettering.
```
**VIDEO motion prompt (6 s):**
```
slow push-in; mist drifts; the floodlight flickers out at the end. Camera and environment motion only; characters stay still except breathing, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style.
```
**VIDEO + AUDIO prompt (Grok Imagine, 6–10 s):**
```
slow push-in; mist drifts; the floodlight flickers out at the end. Camera and environment motion only; characters stay still except breathing, the speaker's lips, hair and clothing moving in wind. No running, no kicking, no new objects or people appear. Keep the same painted style. DIALOGUE: Pop speaks (elderly man in his late 70s, low gravelly baritone, rough and grainy, slow Appalachian-Midwest drawl, long pauses between phrases, gruff on top with quiet warmth underneath): (voice-over, quiet) "Why you kick, kid... that's the only question that matters." Lip movement matches the line; mouths only move for the speaker; no other body motion. AMBIENT SOUND: night wind, distant train horn, puppy settling with a sigh. No music with lyrics, no narrator, no on-screen text or subtitles. The dog's mouth stays closed, the voice comes from offscreen; Puppy never speaks or lip-syncs: her mouth stays closed except for panting or a yawn; only humans speak.
```
**Avoid:** text, crowd; text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, crowds with visible faces, extra figures, hands gripping small objects, warped hands, extra fingers, melted faces, floating objects, the kicker's face, running, kicking motion, photorealism, gore
