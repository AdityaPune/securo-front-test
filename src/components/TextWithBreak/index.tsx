function TextWithBreak({ sentence }: {sentence: string}) {
    if(sentence === undefined || sentence === null) return <></>;
    return <>
        { sentence.split("\\n").map((line:any) => <span>{line}<br/></span>) }
    </>
       
}

export default TextWithBreak;