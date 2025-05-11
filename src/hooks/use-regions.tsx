import { useEffect, useState } from 'react'
import { useGetRegions } from '@/api/region'

export default function useRegions() {
  const { isLoading: isLoadingRegions, data: regions } = useGetRegions()
  const [selectedRegion, setSelectedRegion] = useState<{
    state: string
    lcda: Array<string>
    selectedLcda: string
    region?: Array<Region>
    selectedRegion: string
  }>({
    state: '',
    lcda: [],
    selectedLcda: '',
    region: [],
    selectedRegion: '',
  })
  // Set selected lcda
  useEffect(() => {
    if (regions) {
      const selected = [...new Set(regions.map((region) => region.lcda))]

      setSelectedRegion((prev) => ({
        ...prev,
        lcda: selected,
      }))
    }
  }, [selectedRegion.state])

  // Set selected region
  useEffect(() => {
    if (selectedRegion.selectedLcda) {
      const selected = regions?.filter(
        (item) => item.lcda === selectedRegion.selectedLcda,
      )

      setSelectedRegion((prev) => ({
        ...prev,
        region: selected,
      }))
    }
  }, [selectedRegion.selectedLcda])

  return { isLoadingRegions, regions, selectedRegion, setSelectedRegion }
}
