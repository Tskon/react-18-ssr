type Asset = { name: string }
interface Stats {
  outputPath: string
  namedChunkGroups: {
    main: {
      assets: {
        name: string
      }
    }
  }
}

export default function getAssets(statsJson: string|Stats) {
  const assets = {
    css: [] as string[],
    scripts: [] as string[],
  }
  const parsedStats = (typeof statsJson === 'string') ? JSON.parse(statsJson) : statsJson
  parsedStats.namedChunkGroups.main.assets.forEach((asset: Asset) => {
    if (asset.name.endsWith('.js') && !asset.name.endsWith('hot-update.js')) assets.scripts.push(asset.name)
    if (asset.name.endsWith('.css')) assets.css.push(asset.name)
  })

  return assets
}
