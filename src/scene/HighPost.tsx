import { Bloom, EffectComposer } from '@react-three/postprocessing'

export default function HighPost() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.88} mipmapBlur intensity={0.26} />
    </EffectComposer>
  )
}
