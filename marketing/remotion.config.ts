// Settings for `remotion studio` and `remotion render`. scripts/render.ts passes its own per render.
import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('jpeg')
Config.setJpegQuality(92)
Config.setOverwriteOutput(true)
Config.setCodec('h264')
