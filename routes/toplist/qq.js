const { formatTopList } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 排行榜 qq

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = mergeQQParams({
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  const res = await axios('/v8/fcg-bin/fcg_myqq_toplist.fcg', 'get', params)

  const data = isTrue(format)
    ? formatTopList(res.data.topList, 'qq')
    : res.data.topList
  ctx.body = {
    data,
    ...Tips.qq
  }
}
