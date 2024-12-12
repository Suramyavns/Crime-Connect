export const default_credibility = 600;

export const getCredibilityRank =(score)=>{
    if(score>=650){
        return 'high'
    }
    else if(score>=500){
        return 'average'
    }
    else if(score>=400){
        return 'low'
    }
    else{
        return 'very low'
    }
}