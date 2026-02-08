/**
 * split text into chunks for better AI processing
 * @param {string} text
 * @param {number} chunkSize
 * @param {number} overlap
 * @returns {Array<{content:string,chunkIndex:number,pageNUmber:number}>}
 
 */
export const chunkTest=(text,chunkSize=500,overlap=50)=>{
    if(!text||text.trim().length===0){
        return [];
    }

    //clean text while preservong paragraph structure

    const cleanedText=text
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g,' ')
    .replace(/\n /g, '\n')
    .replace(/\n/g, '\n')
    .trim();


    //try to split by paragraphs

    const paragraphs=cleanedText.split(/\n+/).filter(p=>p.trim().length>0);

    const chunks=[];
    let currentChunk=[];
    let currentWordCount=0;
    let chunkIndex=0;

    for(const paragraph of paragraphs){
        const paragraphWords=paragraph.trim().split(/\s+/);
        const paragraphWordCount=paragraphWords.length;

        //if single para exceeds chunk size
        if(paragraphWordCount>chunkSize){
            if(currentChunk.length>0){
                chunks.push({
                    contnt:currentChunk.join('\n\n'),
                    chunkIndex:chunkIndex++,
                    pageNumber:0
                });
                currentChunk=[];
                currentWordCount=0;

            }

            //split large paragraph into word-basd chunks
            for(let i =0;i<paragraphWords.length;i+=(chunkSize-overlap)){
                const chunkWords=paragraphWords.slice(i,i+chunkSize);
                chunks.push({
                    content:chunkWords.join(' '),
                    chunkIndex:chunkIndex++,
                    pageNumber:0
                });
                if(i+chunkSize>=paragraphWords.length)
                    break;
            }
            continue;
            }

            //if adding this paragraph exceeds chunk size , save current chnk
            if(currentWordCount+paragraphWordCount>chunkSize && currentChunk.length>0){
                chunks.push({
                    content:currentChunk.join('\n\n'),
                    chunkIndex:chunkIndex++,
                    pageNumber:0
                });
                //create overlap from previous chunk

                const prevChunkText=currentChunk.join(' ');
                    const prevWords=prevChunkText.split(/\s+/);
                    const overlapText=prevWords.slice(-Math.min(overlap,prevWords.length)).join(' ');

                        currentChunk.push(paragraph.trim());
                        currentWordCount+=paragraphWordCount;
                    }
                }

                    //add the last chunk
                    if(currentChunk.length>0){
chunks.push({
    cintent:currentChunk.join('\n\n'),
    chunkIndex:chunkIndex,
    pageNumber:0
});

                    }

                    //fallback:if no chunks created,split by words
                    if(chunks.length===0&& cleanedText.length>0){
                        const allWords=cleanedText.split(/\s+/);
                        for(let i=0;i<allWords.length;i+=(chunkSize-overlap)){
                            const chunkWords=allWords.slice(i,i+chunkSize);
                            chunks.push({
                                content:chunkWords.join(' '),
                                    chunkIndex:chunkIndex++,
                                    pageNUmber:0
                                
                            });
                            if(i+chunkSize>=allWords.length) break;

                        }
                    }
                    return chunks;
                    };

                    /**
                     * @param {Array<Object>} chunkS -array of chunk
                     * @param {string} query
                     * @param {numsber} maxChunks
                     * @returns {Array<Object>}
                     
                     */
                    export const findRelevantChunks=(chunks,query,maxChunks=3)=>{
                        if(!chunks||chunks.length===0||!query){
                            return[];
                        }

                            const stopWords=new Set([
                                'the','is','at','which','on','a','an','and','or','but','in','with','to','for','of','as','that','it'
                            ]);
                            //extract and clean query words
                            const queryWords=query
                            .toLowerCase()
                            .split(/\s/)
                            .filter(w=>w.length>2 && !stopWords.has(w));

                            if(queryWords.length===0){
                                 return chunks.slice(0,maxChunks).map(chunk=>({
                                    content:chunk.content,
                                    chunkIndex:chunk.chunkIndex,
                                    pageNumber:chunk.pageNUmber,
                                    _id:chunk._id
                                 }));
                            }

                            const scoredChunks=chunks.map((chunk,index)=>{
                                const content=chunk.content.toLowerCase();
                                const contentWords=content.split(/\s+/).length;
                                let score=0;

                                //score each word
                                for(const word of queryWords){
                                    const exactMatches=(content.match(new RwgExp(`\\b${word}\\b`,'g')) || []).length;
                                    score+=exactMatches*3;

                                    //partial match
                                    const partialMatches=(content.match(new RegExp(word,'g'))|| []).length;
                                    score+=Math.max(0,patialMatches-exactMatches)*1.5;

                                }

                                const uniqueWordsFound=queryWords.filter(word=>
                                    content.includes(word)
                                ).length;
                                if(uniqueWordsFound>1){score+=uniqueWordsFound*2;

                                }

                                //normalize by content length
                                const normalizedScore =score/Math.sqrt(contentWords);

                                const positionBonus=1-(index/chunks.length)*0.1;

                                return {
                                    content:chunk.content,
                                    chunkIndex:chunk.chunkIndex,
                                    pageNumber:chunk.pageNUmber,
                                    _id:chunk._id,
                                    score:normailzedScore*positionBonus,
                                    rawScore:score,
                                    matchedWords:uniqueWordsFound
                                };
                      }  );
                      return scoredChunks
                      .filter(chunk=>chunk.score>0)
                      .sort((a,b)=>{
                        if(b.score!==a.score){
                            return b.score-a.score;
                        }

                        if(b.matchedWords!==a.matchedWords){
                            return b.matchedWords-a.matchedWords;
                        }
                        return a.chunkIndex-b.chunkIndex;
                      })
                      .slice(0,maxChunks);
                            };

