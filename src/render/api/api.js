import * as http from "./http"

/**
 * music相关
 */
//获取歌曲信息
export const getMusicInfo = data => http.getRequest("/music/song", true, data);
//歌曲添加到歌单中
export const addMusicToList = data => http.postRequest("/music/song", true, data);
//把歌曲从歌单删除
export const delMusic = data => http.deleteRequest("/music/song", true, data);
//检索歌曲
export const searchMusic = data => http.getKvRequest("/music/song/search", true, data);
//喜欢音乐
export const likeMusic = data => http.postRequest("/music/song/likeMusic", true, data)
//不喜欢音乐
export const dislikeMusic = data => http.deleteRequest("/music/song/dislikeMusic", true, data)
/**
 * musiclist相关
 */
//检索用户的歌单列表(创建&默认)
export const getCreateMusicListInfo = data => http.getRequest("/musiclist/created", true , data);
//检索用户的歌单列表(收藏)
export const getCollectMusicListInfo = data => http.getRequest("/musiclist/collected", true, data);
//推荐歌单
export const getDiscoverMusicListInfo = data => http.getRequest("/musiclist/discover", false, data);
//收藏歌单操作
export const collectMusicList = data => http.postRequest("/musiclist/collect", true, data);
//取消收藏歌单操作
export const unCollectMusicList = data => http.deleteRequest("/musiclist/unCollect", true, data);
//根据歌单ID查询带状态的歌单歌曲列表
export const getUserMusicList = data => http.getRequest("/musiclist", true, data);
//根据歌单id返回歌单详细信息
export const getMusicListInfo = data => http.getRequest("/musiclist/getinfo", true, data);
//新建歌单
export const createMusicList = data => http.postForJson("/musiclist/created", true, data);
//删除歌单
export const delMusiclist = data => http.deleteRequest("/musiclist", true, data);
//更新歌单信息
export const updateMusiclist = data => http.patchForJson("/musiclist/update", true, data);

/**
 * 评论相关
 */
//添加评论 相对于资源来说  每首歌曲下面的评论
export const saveComments = data => http.postForJson("/comments/saveComments", true, data);
//获取单条评论内容
export const getComment = data => http.getRequest("/comments/getComment", false, data);
//获取资源评论
export const getAllComments = data => http.getRequest("/comments/getAllComments", false, data);

/**
 * 用户相关
 */
//获取用户信息
export const getUserInfo = data => http.getRequest("/users/userinfo", false, data);
//修改用户信息
export const updateUserInfo = data => http.patchForJson("/users/userinfo", true, data);
//注册
export const register = data => http.postForJson("/users/register", false, data);

/**
 * 登录
 */
export const login = data => http.login("/oauth/token",data);