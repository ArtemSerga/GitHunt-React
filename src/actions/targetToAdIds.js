export const sortAds = (targets, ads, insertions) => {
  return {
    type: "SORT_ADS",
    targets: targets,
    ads: ads,
    insertions: insertions,
  }
}


