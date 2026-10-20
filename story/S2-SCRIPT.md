# Season 2 · "Captain of the Hawks" · Script

Draft for Kirk. Branch `story-s2` (from main c72e81f). Same structure and engine as S1 (`story1.js`): scenes with lines, up to 3 choices (fx meters fan/coach/fam + flags), 5 game weeks with kick cards, 2 text screens, finale. **No art generated yet.**

Canon (BIBLE.md): Coach D is a Black man, now 45. Rae is a woman, 39, a custodian in blue scrubs. Pop is 73 and still on his feet. Jojo is 10, and their gender follows the player's pick, so the art stays neutral. Puppy is a female Pomeranian-husky, about 1 year old, and **never speaks**. Gus is 37 and still active with Harbor City. Old Faithful is **a beat-up lucky old leather football** (scuffed brown, worn faded laces, a tape patch). The mill closed **Dec 1** of S1. The kicker's face is never shown, and the kicker never speaks.

Music cues reuse S1's 7 moods (home, tense, sad, triumph, hopeful, rival, mystery). No new audio needed.

## Season arc (short)
The mill is dead and the house is at risk. The kicker sweeps Mabel's Diner at 5 a.m., gets voted captain, and gets a nickname drawn from their S1 ritual. Homecoming has a cardboard milk-jug float. A Coastal Tech recruiter starts showing up. Gus Hollander turns up at Pop's kitchen table, and Pop clearly knows him. The team beats or loses to Ridgeline again, then plays the Prairie Creek Plowmen for the regional title in the fog. Whatever the result, the team rallies to save the house. The cliffhanger is Signing Day: Coastal Tech gives its one spot to Dez. That night Pop pulls out an unopened envelope and points the kicker to the Hometown State walk-on tryout.

## S1 flags read in S2
- `why` appears on the garage wall (s2c3). `rit` sets the nickname (s2c6) and Pop's line in s2c3. `wes` decides between Wes as snapper and a second chance (s2c5). `tip` and `gus` set Coach D's whiteboard line and Gus's signature line (s2c9, s2c10). `went40` unlocks the 44 in week 2 and the recruiter line. `dez` sets Dez's week 4 opener. `w2` (the Fog Game result) sets Pop's Plowmen line (s2c12). `cap` and `jug` feed the Homecoming float. Meters carry over.

## New S2 flags
work, line2, cocap, wesHurt, nick, recruit, passBall, toldD, askPop2, gusDrill, dez2, fogPrac, blind, cap2, promise, and w0–w4. Each one has a payoff listed beside it.

## Scene flow
s2c1 → s2c2 → s2c3 → s2c4 → s2c5 → **wk1** → s2c6 → s2tx1 → **wk2** → s2c7 → s2c8 → **wk3** → s2c9 → s2c10 → s2tx2 → **wk4** → s2c11 → s2c12 → **wk5** → s2c13w / s2c13l → s2c14 → s2c15 → s2c16 → s2c17 → end

Weeks: 1 Mill Valley Millers (home), 2 Cedar Bluff Bobcats (Homecoming), 3 at Ironwood Foxes, 4 Ridgeline Rattlers (rival), 5 Prairie Creek Plowmen (regional final, fog, OT on a miss). Three Breaths is available in weeks 4–5 (twice if `blind`).

## Image prompt rules
Each prompt is built from the style line, the scene, the camera/light, the character sheet for everyone in frame, the no-text/no-background-players line, and the avoid line. Paste it into **Grok Imagine → Image** at 9:16 and export to `story/<id>.webp` at 720×1280.

Style line (⚠ reconstructed from the c3_v4 look, because the exact c3_v4 wording wasn't saved anywhere on disk. Kirk can paste his original and I'll swap it in everywhere):
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art.
```
No-text / no-background-players line:
```
No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```

---

## 1. `s2c1` · Dec 1. The gate closes
**Mood:** `sad`

**Beats**
- Cold open, last December. The paper mill's whistle blows one last time at noon. Then the chimneys just... stop.
- Pop stands at the chain-link gate with forty years of lunch pails behind him. Rae holds his arm. Nobody says anything.
- Black card: SEASON 2 · CAPTAIN OF THE HAWKS. Eight months later.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Pop and Rae standing at a closed chain-link mill gate, Pop's hand on the cold padlocked chain, Rae holding his arm; behind them the paper mill's two chimneys standing dead with no smoke against a white winter sky. Camera/light: eye-level medium-wide from slightly behind; flat winter noon light, gray-green and rust, breath visible. Rae is the kicker's mother, a woman of 39, dark hair in a messy bun, tired kind eyes, blue hospital scrubs-style work uniform. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. Old Faithful is a beat-up old lucky leather football: scuffed brown leather, worn faded laces, a patch of gray tape on it. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 2. `s2c2` · 5:00 AM at Mabel's
**Mood:** `home`

**Beats**
- August. The kicker sweeps the floor of Mabel's Diner at 5 a.m. Rae's custodian check and her diner weekends don't cover the house anymore.
- Mabel slides a plate of eggs down the counter: "Eat. You can't kick on an empty tank."
- Rae, finishing her own shift in the back booth, watches over her coffee and pretends she isn't.

**Choices → payoff**
- Take the extra Saturday shift Mabel offers. *(fam+5, coach-2, flag work=1)*. Payoff: S2 week 3 you're late to Saturday film (s2c9 line); Rae notices and tells you to quit it in s2c15 (fl work).
- Say no. Saturdays are for the leg. *(coach+3, flag work=0)*. Payoff: s2c9 Coach D's extra film session; tx2 Rae picks up the shift herself (guilt beat).

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Inside a small-town diner at dawn: the kicker from behind sweeping the checkered floor with a push broom; Mabel behind the counter sliding a plate of eggs; Rae asleep-tired in a back booth holding a coffee mug. Camera/light: wide from the counter end; blue pre-dawn window light against warm amber diner lamps. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Mabel is a sturdy diner owner in her 60s, silver hair pinned up, reading glasses on a chain, faded pink diner apron. Rae is the kicker's mother, a woman of 39, dark hair in a messy bun, tired kind eyes, blue hospital scrubs-style work uniform. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 3. `s2c3` · The garage wall, one year later
**Mood:** `home`

**Beats**
- Pop's garage. The single bulb. Your line from last year is still on the wall: "{why}".
- Pop takes Old Faithful down off its nail and tosses it to you. "Senior year. It's yours now. Don't let it sit on a nail."
- {if rit} He's noticed your ritual. "{ritual line}" He almost smiles.

**Choices → payoff**
- Write a second line under the first. *(flag line2=1)*. Payoff: the finale (s2c17) shows both lines; carried to S16.
- Leave the wall alone. One line is enough. *(fam+2)*. Payoff: Pop: "Good. Means you meant it." (spoken in s2c17).

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Pop in his garage under a single bare bulb, holding out a beat-up old leather football toward the kicker's open hands in the foreground; behind him a wooden wall covered in faint unreadable pencil height marks and one unreadable pencil line of handwriting. Camera/light: over-the-shoulder from behind the kicker; warm single-bulb light, dusty window beam, browns and amber. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. Old Faithful is a beat-up old lucky leather football: scuffed brown leather, worn faded laces, a patch of gray tape on it. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 4. `s2c4` · Captain vote
**Mood:** `tense`

**Beats**
- First practice. Coach D lines the team up on the goal line. "Captain vote. Secret ballot. Kicker's never been captain here. Doesn't mean it can't happen."
- Tank is the favorite. Everybody knows it, including Tank.
- Coach D reads the slips in the equipment shed, alone. He comes out and hands you a plain red patch.

**Choices → payoff**
- "Tank should have it." Offer to share. *(fan+3, flag cocap=1)*. Payoff: Tank is co-captain; s2c13 he carries you off the field.
- Take the patch. Nod once. *(coach+5, flag cocap=0)*. Payoff: s2c8 the locker-room speech is yours alone.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Coach D on a high school practice field at golden hour handing a small plain red fabric patch to the kicker, seen from behind; Tank and Wes standing a few steps back watching. Camera/light: low angle from field level; warm late sun, long shadows, red and navy. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. Tank is a huge gentle 17-year-old lineman, round friendly face, plain red Hawks practice jersey with no number. Wes is a lanky 16-year-old boy with shaggy light-brown hair and slouched shoulders, plain red practice jersey with no number. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 5. `s2c5` · Wes snaps
**Mood:** `hopeful`

**Beats**
- {if wes} A year of garage-door snaps paid off: Wes is the varsity long snapper now. He's grown two inches and still won't look anyone in the eye.
- {if !wes} Wes Tilly is still on the end of the bench. Coach D needs a long snapper, and nobody wants it.
- Wes: "I can do it. Probably. If you don't yell."

**Choices → payoff**
- "I never yell." Practice with him every night. *(flag wes=1, fam+2)*. Payoff: if Wes wasn't invited in S1, this is his second chance; S2 kicks get a +1 snap-steady line; S3 Wes stays at Hollow Creek (bible).
- Ask Coach for a senior snapper instead. *(coach+2, flag wesHurt=1)*. Payoff: tx1 Wes's short text; s2c16 he's not at the signing table.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Wes crouched over a football at the line on an empty practice field at dusk, looking back between his legs toward the kicker standing in the distance from behind. Camera/light: low ground-level angle behind Wes; dusky blue with warm horizon. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Wes is a lanky 16-year-old boy with shaggy light-brown hair and slouched shoulders, plain red practice jersey with no number. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 6. `s2wk1` · Week 1 · Mill Valley Millers
**Mood:** `tense`

**Beats**
- Week 1, at home vs the Mill Valley Millers. Half of the Millers' dads worked at the same mill. Nobody in either bleacher is cheering very loud.
- Kicks: 28, 34, 22 PAT-style. Need 2 of 3.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Hollow Creek field at night from the home sideline: small aluminum bleachers soft and empty-looking in blur, yellow goalposts, water tower and two smokeless mill chimneys beyond; the kicker from behind setting Old Faithful on the grass. Camera/light: wide low angle behind the kicker; Friday stadium lights, cool night, amber glow. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 7. `s2c6` · The first nickname
**Mood:** `hopeful`

**Beats**
- After the win, Jojo interviews you with the hairbrush mic on the porch steps. Puppy, a year bigger and twice as fluffy, sits on your cleats again.
- Jojo: "The guys are calling you '{nick}'. Comment?"  (nickname from the S1 ritual: tap→'Two-Tap', sock→'Socks', seat→'Seat Check', line→'Whisper')
- Puppy yawns. Jojo calls it a no comment.

**Choices → payoff**
- Own it: "Write it down." *(fan+5, flag nick=1)*. Payoff: the PA announcer uses it from week 2; S3 college teammates pick it up (bible ⚑ nickname).
- "Just use my name." *(fam+3, flag nick=0)*. Payoff: the PA announcer uses your name; Jojo keeps the nickname for the scrapbook only.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. On a wooden porch at night under a single porch light: Jojo holding a hairbrush like a microphone toward the kicker sitting on the steps seen from behind; Puppy lying across the kicker's cleats. Camera/light: eye-level from the side of the steps; warm porch light, deep navy night. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Jojo is a 10-year-old with a shaggy dark bowl cut and a gap-toothed grin in an oversized plain red hoodie; gender-neutral look. Puppy is a small fluffy female Pomeranian-husky mix (about one year old) with a thick black, grey and tan coat, pointed ears and husky face markings; her mouth is closed. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 8. `s2tx1` · Between games 1
**Mood:** `home`

**Beats**
- Texts. Rae: "Mabel says you swept like a pro. Also the eggs are free now? Don't ask her why."
- Coach D: "Film at 7. Captains come at 6:45."
- Wes (if wes): "snapped 200 into the garage door. your mom yelled at me. worth it."  /  Wes (if wesHurt): "good luck friday."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Close on a bedroom nightstand at night: a cracked phone glowing face-down light, a red patch lying next to it, Old Faithful on the floor beside a pair of cleats; window shows faraway stadium light. Camera/light: tight top-down three-quarter; phone glow and cool window light. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 9. `s2wk2` · Week 2 · Homecoming vs Cedar Bluff
**Mood:** `tense`

**Beats**
- Homecoming vs the Cedar Bluff Bobcats. The float is a cardboard milk jug. Jojo made it.
- Kicks: 31, 38, 44. Need 2 of 3. The 44 only appears if you went for the 40 in S1 (went40).

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A homemade parade float on a small-town main street at dusk: a giant cardboard-and-tape milk jug on a flatbed trailer with red streamers; storefronts with blank unreadable windows; no people. Camera/light: low wide street-level; warm dusk, string lights, faded red and navy. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 10. `s2c7` · Recruiter in the bleachers
**Mood:** `mystery`

**Beats**
- A man in a plain navy polo with a clipboard sits alone in the top row of the bleachers. Coastal Tech. He's here for you. Or for the 44.
- Coach D, quietly: "He's also been to Ridgeline twice."
- {if went40} "He liked the 40 from last year. Saw it on someone's dad's tape."

**Choices → payoff**
- Go talk to him after the game. *(fan+2, flag recruit=talk)*. Payoff: s2c16 he remembers you by name; still gives the spot to Dez (cliffhanger stings harder).
- Let your kicks talk. *(coach+3, flag recruit=wait)*. Payoff: s2c16 he admits he never saw you up close; Coach D: "His loss."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Coach D standing at the foot of empty aluminum bleachers at night, looking up toward a lone man in a plain navy polo with a clipboard seated high in the top row, small and out of focus; the kicker's shoulder in the foreground from behind. Camera/light: low angle from the field; stadium light flares, cold navy. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 11. `s2c8` · Captain's speech
**Mood:** `hopeful`

**Beats**
- Week 3 is on the road. The bus is quiet. Coach D looks at you: "Captain."
- {if cocap} Tank stands up with you. "We both talk. I'll go loud, you go short."
- You don't speak. You hold up Old Faithful. The tape catches the bus light.

**Choices → payoff**
- Pass Old Faithful down the aisle. Everyone touches the tape. *(fan+5, flag passBall=1)*. Payoff: s2wk5 the whole team taps it before the final kick.
- Put it back in your bag. Nod. *(coach+2)*. Payoff: s2c13 Coach D: "You didn't need a speech."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Interior of an old yellow school bus at night: the kicker from behind standing in the aisle holding up a beat-up leather football with a tape patch; Coach D seated in the front row watching; Tank's broad shoulder in a seat. Camera/light: from the back of the bus toward the front; dim cabin light, passing orange streetlight streaks. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. Tank is a huge gentle 17-year-old lineman, round friendly face, plain red Hawks practice jersey with no number. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 12. `s2wk3` · Week 3 · at Ironwood
**Mood:** `tense`

**Beats**
- Week 3 at the Ironwood Foxes. Lumpy field, loud crowd, again. Kicks: 26, 37, 41. Need 2 of 3.
- {if work} You came straight from Saturday at the diner to the bus. You smell like bacon. Tank says it's motivating.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A lumpy uneven road football field at night: patchy grass and divots in sharp focus at ground level, yellow goalposts far away, harsh orange stadium light; empty dark stands. Camera/light: ground-level macro wide; harsh orange light, navy shadows. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 13. `s2c9` · Film room, 6:45
**Mood:** `home`

**Beats**
- Film room. Coach D freezes the tape on your plant foot.
- {if work} "You were late. Again. I know why. I'm not mad. I'm worried."
- {if !work} "Extra film every Saturday. Look at that hip. That's a college hip."
- {if tip} He asks what Gus Hollander told you last summer. You tell him: "{tip}". He writes it on the whiteboard.

**Choices → payoff**
- Tell him the truth about the house. *(coach+3, flag toldD=1)*. Payoff: s2c15 Coach D shows up at Mabel's with a sign-up sheet for the team to help.
- "Everything's fine, Coach." *(flag toldD=0)*. Payoff: s2c15 Rae finds out from Mabel instead.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A small cluttered high school film room: Coach D in profile beside an old projector beam lighting a blank pull-down screen, one hand raised to point; the kicker seated from behind in a folding chair. Camera/light: side angle; projector beam with floating dust, dark room, warm accent. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 14. `s2c10` · Gus comes back
**Mood:** `mystery`

**Beats**
- A gray truck in the driveway. Gus Hollander, Harbor City's kicker, at your kitchen table with Pop, drinking bad coffee.
- "I told you I knew a kicker from Hollow Creek." He looks at Pop. Pop looks at the coffee.
- {if gus} He sees his own signature on Old Faithful. "Still using it. Good."

**Choices → payoff**
- Ask Pop straight out: "You knew him?" *(fam+3, flag askPop2=1)*. Payoff: Pop: "Letters. That's all. Not tonight." Seeds Pop's letters (bible S7/S14).
- Ask Gus to watch you kick. *(coach+3, flag gusDrill=1)*. Payoff: a backyard drill; next kick card gets Gus's line; S3 Gus's clinic invite.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A small dim kitchen at night: Gus seated at the table with a toothpick, Pop across from him looking down at a coffee mug, a salt shaker on the table; Old Faithful on the counter; the kicker's shoulder in the doorway foreground. Camera/light: from the doorway; one hanging bulb, cold window, amber and brown. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Gus is a broad man of 37 with a short beard going early gray at the chin, a toothpick, plain green ball cap with no logo, faded gray windbreaker. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. Old Faithful is a beat-up old lucky leather football: scuffed brown leather, worn faded laces, a patch of gray tape on it. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 15. `s2tx2` · Between games 2
**Mood:** `home`

**Beats**
- Texts. Jojo: "PUPPY ATE THE HOMECOMING CROWN. it was cardboard. she's fine."
- Tank: "coach says we got Ridgeline then Plowmen. if we beat both we're in the regional."
- Rae: "Picked up a Saturday at Mabel's. Don't argue." (only if you said no to the shift)

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Close on a kitchen counter at night: a phone lying face-up with a soft blank glow, a chewed cardboard crown beside it, a small dog's tufted ear just entering the frame. Camera/light: tight three-quarter top-down; warm kitchen light, cool window. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 16. `s2wk4` · Week 4 · Ridgeline, again
**Mood:** `rival`

**Beats**
- Week 4 vs the Ridgeline Rattlers. Last year's rivalry game. Dez Calloway's last high school game against you.
- {dez=fire} Dez: "Hope your grandpa's ball still has air in it."  {dez=nice} Dez nods at you across midfield.  {dez=quiet} Dez points at the scoreboard first this time.
- Kicks: 33, 39, 45. Need 2 of 3.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Midfield at dusk warm-ups: Dez standing in a forest-green-and-black warm-up jacket looking across at the kicker seen from behind; Old Faithful on the grass between them. Camera/light: low angle at grass level with the old ball in focus; red-orange dusk, green and red. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Dez is a 17-year-old boy with close-cropped dark hair and a smirk, plain forest-green-and-black warm-up jacket with no lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 17. `s2c11` · Dez, after
**Mood:** `rival`

**Beats**
- After the game, Dez finds you at the fence. No smirk.
- "Coastal Tech's got one spot. You know that, right? One."
- His dad is filming from the parking lot.

**Choices → payoff**
- "Then may the best kick win." Shake his hand. *(fan+3, flag dez2=respect)*. Payoff: Signing Day (s2c16) Dez texts you before you hear it; seeds S5/S8 friendship.
- "I know. I'm taking it." *(coach+3, flag dez2=war)*. Payoff: Signing Day Dez says nothing; S3 Brody sees the tape.
- Walk away. *(flag dez2=cold)*. Payoff: Dez's dad's tape catches you leaving; it shows up in S3.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. At a chain-link fence beside the field at night: Dez leaning on the rail facing the kicker seen from behind, hands in his jacket pockets; empty parking lot with one car's headlights behind. Camera/light: eye-level medium; cold stadium light, headlight glow, green and navy. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Dez is a 17-year-old boy with close-cropped dark hair and a smirk, plain forest-green-and-black warm-up jacket with no lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 18. `s2c12` · Plowmen week
**Mood:** `tense`

**Beats**
- Regional final: the Prairie Creek Plowmen. The fog team. The team that ended your season last year in the fog... or the one you beat in it.
- {w2 S1 fog win} "They remember you," Pop says. "They hate fog now."  {else} "They think you're scared of fog," Pop says. "Are you?"
- Pop teaches no new trick. "Three Breaths. Same as last year. Same as always."

**Choices → payoff**
- Practice in the morning fog by the river. *(flag fogPrac=1)*. Payoff: wk5 fog kicks show the posts a little longer.
- Practice with your eyes closed in the garage. *(flag blind=1)*. Payoff: Three Breaths can be used twice this season.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A riverside field at dawn in thick fog: Pop in flannel and cap standing near a lone wooden post, the kicker from behind with Old Faithful under one arm; Wes kneeling at a snapping spot, faint. Camera/light: wide eye-level; pearly fog, low sun glow, gray-green. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. Wes is a lanky 16-year-old boy with shaggy light-brown hair and slouched shoulders, plain red practice jersey with no number. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 19. `s2wk5` · Week 5 · Prairie Creek Plowmen
**Mood:** `rival`

**Beats**
- Regional final vs the Prairie Creek Plowmen. Fog rolls in at halftime. Of course it does.
- Kicks: 30, 36, fog 42. Last kick decides it. OT on a miss. Three Breaths available. {if passBall} The whole team taps the tape first.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Night football field in heavy fog at the edge of stadium light: only the bases of yellow goalposts visible, the tops dissolving; the kicker from behind setting a taped old leather football on the grass. Camera/light: low wide behind the kicker; diffused white light, pearly gray, faint amber. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 20. `s2c13w` · Regional champions
**Mood:** `triumph`

**Beats**
- It goes through the fog. You only know because the Hollow Creek side roars.
- {if cocap} Tank lifts you onto his shoulders. {else} The team pours over the fence.
- Rae is at the fence in her scrubs, laughing and crying. "I didn't need to see it."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. At the chain-link fence in fog under stadium light: Rae in scrubs reaching over the rail to hug the kicker seen from behind; Jojo pressed against the fence beside her; Tank's huge shoulder at the edge of frame. Camera/light: eye-level medium from behind the kicker; warm diffused fog light, red and navy. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Rae is the kicker's mother, a woman of 39, dark hair in a messy bun, tired kind eyes, blue hospital scrubs-style work uniform. Jojo is a 10-year-old with a shaggy dark bowl cut and a gap-toothed grin in an oversized plain red hoodie; gender-neutral look. Tank is a huge gentle 17-year-old lineman, round friendly face, plain red Hawks practice jersey with no number. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 21. `s2c13l` · The fog wins
**Mood:** `sad`

**Beats**
- It drifts. You hear it before you see it: nothing. No roar.
- Coach D walks you off, hand on your helmet. "Senior year doesn't end on a kick. It ends at a table. Remember that."
- Pop is in the empty bleachers, alone, nodding like you did it right anyway.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. An empty foggy field after a game: Coach D walking beside the kicker seen from behind with a hand on the kicker's helmet; Pop seated alone in the empty bleachers in the soft background. Camera/light: wide from behind; cold fog, dim lights, gray-green. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 22. `s2c14` · The scrapbook
**Mood:** `home`

**Beats**
- Jojo pastes the season into the scrapbook: the cardboard jug float, the patch, a blurry fog photo.
- Puppy sleeps on page one. Jojo writes a caption under the last photo.

**Choices → payoff**
- "Captain." *(fan+3, flag cap2='Captain.')*. Payoff: S3 opening card.
- "Every Friday costs something. Still worth it." *(fam+5, flag cap2='Still worth it.')*. Payoff: S3 Rae quotes it.
- "See you in the fog." *(coach+3, flag cap2='See you in the fog.')*. Payoff: S14–15 Pop's fog secret callback.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A kitchen table at night: an open handmade scrapbook with blank unlabelled photos and a cardboard jug cut-out, a glue stick; Jojo's hands pressing a photo down; Puppy asleep on the corner of the page. Camera/light: top-down three-quarter; warm lamp light, brown table. Jojo is a 10-year-old with a shaggy dark bowl cut and a gap-toothed grin in an oversized plain red hoodie; gender-neutral look. Puppy is a small fluffy female Pomeranian-husky mix (about one year old) with a thick black, grey and tan coat, pointed ears and husky face markings; her mouth is closed. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 23. `s2c15` · The house
**Mood:** `sad`

**Beats**
- {if toldD} Saturday. Half the Hawks show up at Mabel's with Coach D and a sign-up sheet. They're doing dishes for free. Mabel cries into the pancake batter.
- {if !toldD} Rae finds out from Mabel. She doesn't yell. That's worse.
- Rae, at the kitchen table: "We're keeping the house. {if work}And you're quitting Saturdays. That's not a request."

**Choices → payoff**
- Hug her. *(fam+5)*. Payoff: none. Just a hug.
- Promise you'll get the scholarship. *(fan+2, flag promise=1)*. Payoff: Signing Day hurts more; S3 Rae: "You never owed me that."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. A diner kitchen at morning: a row of red-hoodied teenagers seen from behind at a sink and dish rack, Mabel at the pass with flour on her apron wiping her eyes; Rae in scrubs in the doorway. Camera/light: medium wide from the pass window; warm morning steam, amber and red. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Rae is the kicker's mother, a woman of 39, dark hair in a messy bun, tired kind eyes, blue hospital scrubs-style work uniform. Mabel is a sturdy diner owner in her 60s, silver hair pinned up, reading glasses on a chain, faded pink diner apron. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 24. `s2c16` · Signing Day
**Mood:** `sad`

**Beats**
- February. Signing Day. The gym has a folding table with a red tablecloth and an empty chair for you.
- Coach D's phone buzzes. He reads it twice. "Coastal Tech gave the spot to Dez Calloway."
- {dez2=respect} Your phone buzzes too. Dez: "I'm sorry. I mean it."

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. An empty school gym: a single folding table with a plain red tablecloth and one empty folding chair under a single spotlight; Coach D standing at the edge looking down at a phone; the kicker from behind in the doorway. Camera/light: wide from the doorway; one hard pool of light, dark gym, red accent. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Coach D is a Black man of 45 with short cropped hair and a trimmed beard, calm stern posture, plain navy windbreaker, whistle on a cord. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 25. `s2c17` · Two lines on the wall
**Mood:** `mystery`

**Beats**
- That night, Pop's garage. Old Faithful back on its nail for the first time in a year.
- {if line2} Your second line is under the first. {else} Pop: "Good. One line. Means you meant it."
- Pop: "Coastal Tech. Huh." He takes a yellowed envelope from a coffee can and doesn't open it. "Walk-on tryouts at Hometown State are in August. Somebody I know is watching."
- To be continued in Season 3: "Walk-On".

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Pop's garage at night under a single bulb: a beat-up taped leather football back on its nail on a pencil-marked wooden wall; Pop holding a yellowed blank envelope by an old coffee can; the kicker's silhouette in the doorway. Camera/light: over-the-shoulder from the doorway; warm bulb, cold blue doorway, browns and amber. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. Pop is a weathered grandfather of 73, short white stubble, weathered hands, red-and-black flannel shirt, worn cap, on his feet without a cane. Old Faithful is a beat-up old lucky leather football: scuffed brown leather, worn faded laces, a patch of gray tape on it. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 26. `s2field` · Story Mode home (S2)
**Mood:** `home`

**Beats**
- Season 2 title backdrop used for the S2 home and kick screens.

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. The Hollow Creek High football field at dusk: small aluminum bleachers empty, yellow goalposts, water tower and the two mill chimneys beyond standing dark with no smoke, a single red banner tied blank to the fence. Camera/light: wide low angle from the end zone; amber dusk to navy, gray-green chimneys. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


## 27. `s2end` · Season 2 end card
**Mood:** `mystery`

**Beats**
- End screen: 'Captain of the Hawks · complete'. Unlock: 'Captain's Patch' look (red patch on a gray hoodie).

**IMAGE prompt**
```
STYLE: near-photoreal cinematic film still, 35mm look, natural skin texture, shallow depth of field, soft film grain, muted Americana small-town palette (dusty navy, faded rust, warm amber, mill-town gray-green), motivated practical light, 9:16 vertical portrait, story-game key art. Night: the kicker from behind walking alone across an empty field toward dark goalposts carrying a beat-up leather football, the dead mill chimneys on the horizon under a full moon. Camera/light: wide low; moonlight and one far stadium lamp, navy and silver. The kicker is custom-made by the player, so never show their face: back view, silhouette, or hands and feet only; plain red Hollow Creek Hawks jersey or hoodie with no numbers or lettering. No text anywhere: no letters, numbers, signs, logos, jersey numbers, scoreboards, labels or watermarks. No background players or extra people: only the characters named in this prompt; any stands are empty or soft out-of-focus lights.
```
Avoid: text, letters, numbers, signs, logos, watermarks, real team names, jersey numbers, background players, crowds with visible faces, extra figures, the kicker's face, warped hands, extra fingers, melted faces, floating objects, painted or cartoon look.


---
## Bible calls for Kirk
1. **Year and age.** The brief says *junior, age 17*. The bible says S1 = junior at 16 and S2 = **senior, 17** ("Captain of the Hawks (HS senior, 17)"). This script uses **senior at 17**. Confirm, or tell me to make S1 sophomore year.
2. **Rival.** The bible's archrival is the **Ridgeline Rattlers** ("Ridgeline again" in S2), and the Plowmen were S1's Week 3 fog team. The brief calls the Plowmen *the rival*. The script makes the Plowmen the regional-final rival (the fog rematch) and keeps Ridgeline for week 4. Should the Plowmen replace Ridgeline as the archrival, or keep both?
3. **Dez's school.** In S1, Dez kicked for Ridgeline (c13 rivalry). Confirm he's still Ridgeline in S2 and not a Plowman.
4. **Style line.** Please paste the exact c3_v4 near-photoreal line. The one above is reconstructed.
5. **Nickname mapping** from the S1 ritual (Two-Tap / Socks / Seat Check / Whisper). OK?
6. **Recruiter.** He is an unnamed Coastal Tech man in a plain navy polo. Name him, or keep him anonymous?
7. **S2 unlock look.** Captain's Patch (red patch on a gray hoodie). OK?
8. **Gus** turns up at Pop's kitchen table and Pop admits to "letters". Is that too early, since the bible holds the letters for S7/S14? The script only hints and doesn't reveal them.
