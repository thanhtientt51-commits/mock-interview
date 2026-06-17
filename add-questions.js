const fs = require('fs');
let h = fs.readFileSync('index.html','utf-8');

// Add mock questions to each category in GWY
var addQ = {
  '综合分析': ',人工智能技术快速发展，有人认为会大大提高生产效率，也有人担忧会带来大规模失业。你怎么看？,预制菜进校园引发家长担忧和社会热议。请谈谈你的看法。,多地开设办不成事反映窗口专门受理群众疑难问题。对此你怎么看？,数字人技术用科技激活传统文化之美。请谈谈科技如何助力传统文化传承。,促进代经济良性发展——代购代驾代跑腿等新业态兴起。请谈谈你的看法。,用枫桥经验筑牢基层治理之基。请从基层干部角度谈谈如何践行。,领导干部公开手机号码有人点赞亲民有人担忧作秀。你怎么看？,让年轻人在乡村找到用武之地。请谈谈如何吸引青年人才投身乡村振兴。',
  '组织管理': ',单位组织群众为灾区捐献物资领导让你负责你如何组织？,在地铁站开展普法主题宣传活动你认为重点是什么？,组织农村农业技能培训会你会如何策划和实施？,制定红色旅游发展方案你会重点调研哪些内容？,单位开展方言调解员招募工作你如何推进？,社区要组织新时代文明实践活动作为负责人你怎么开展？',
  '应急应变': ',群众来政务大厅办业务排了很久队因证件不全无法办理情绪激动指责服务承诺骗人。作为负责人你怎么沟通？,政务中心突然秩序混乱大量群众涌入作为值班人员你怎么办？,你是派出所民警接到群众投诉说社区停车场被外来车辆占满居民停车困难。你怎么办？,拒绝同事被误解对方认为你故意刁难你如何处理？',
  '人际关系': ',领导安排你和老王一起完成任务你提出改进建议但老王不接受其他同事也对老王有意见。你怎么办？,新来的同事工作不认真经常迟到早退你作为老同事怎么跟他沟通？,老同事不接纳你的改进建议觉得年轻人不懂装懂。你如何处理这种关系？,同事把你的功劳说成是他的领导表扬了他。你怎么办？',
  '岗位匹配': ',结合你报考的岗位谈谈你认为读书对公务员工作有什么帮助？,谈谈你对全心全意为人民服务的理解。,如果你被录用后发现岗位和预期差距很大你会怎么调整？,请用学习创新担当三个词结合岗位谈谈你的认识。',
};

for (var cat in addQ) {
  // Find the closing bracket of each category array
  var search = '\"' + cat + '\":[';
  var idx = h.indexOf(search);
  if (idx === -1) { console.log('Not found: ' + cat); continue; }
  // Find the matching ] for this array
  var depth = 0;
  var insertPos = -1;
  for (var i = idx; i < h.length; i++) {
    if (h[i] === '[') depth++;
    if (h[i] === ']') { depth--; if (depth === 0) { insertPos = i; break; } }
  }
  if (insertPos === -1) { console.log('No closing bracket for: ' + cat); continue; }
  h = h.substring(0, insertPos) + addQ[cat] + h.substring(insertPos);
  console.log('Added to ' + cat);
}

fs.writeFileSync('index.html', h);
console.log('done');
