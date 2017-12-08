(function () {
    'use strct';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子どもを全て削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {// 子どもの要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            //TODO　ボタンのonclick()　処理を呼び出す
            assessmentButton.onclick();
            
        }
    };

    assessmentButton.onclick = () =>{
        const userName = userNameInput.value;
        if (userName.length === 0) {　//名前が空の時は処理を終了する
            return;
        }

        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODO　ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement("a");
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
            + encodeURIComponent(result);
        anchor.setAttribute('href',hrefValue);
        anchor.className = "twitter-hashtag-button";
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };



    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられるme}{userName}が皆から評価されています。',
        '{userName}のいいところは柔軟性です。固定観念にとらわれない{userName}の考えに助けられている人がいます。',
        '{userName}のいいところはキャラクターです。{userName}の振る舞い、人柄などを多くの人が評価しています。',
        '{userName}のいいところはレジリエンスです。強いストレスに見舞われてもすぐに立ち上がり、むしろストレス経験を強みに転換できる{userName}の強さに皆が支えられています。',
        '{userName}のいいところは勇敢さです。{userName}の行動に、皆も勇気づけられています。',
        '{userName}のいいところは心と体のバランスが取れていることです。安定感のある{userName}と一緒に過ごすことに、皆がやすらぎを感じています。',
        '{userName}のいいところは向学心です。常に学び続ける{userName}を皆が尊敬しています。',
        '{userName}のいいところは姿勢の良さです。{userName}のスッと伸びた背筋に皆が育ちの良さや誠実さなどの好意的な印象を持っています。',
        '{userName}のいいところはフットワークの軽さです。なんでも試してみる{userName}に皆がわくわくしています。',
        '{userName}のいいところは謙遜ができることです。自分の立ち位置を把握できる{userName}のふるまいに多くの人が感心しています。',
        '{userName}のいいところはオタク的なところです。自分の好きな分野を掘り下げて学ぶ{userName}の語る話を皆が楽しみにしています。',
        '{userName}のいいところは褒める技術です。褒めてもらった多くのひとが{userName}に好感を抱いています。',
        '{userName}のいいところは今を生きていることです。一瞬、一瞬を味わって生きている{userName}の生き方をアドラーも推奨していますし、皆も生き活きとしたあなたに憧れています。',
        '{userName}のいいところはすぐに忘れることです。嫌なことをすぐ忘れるが、得別ドライというわけではないので{userName}は一番付き合いやすい人だと評判です。',
        '{userName}のいいところは困難と思えることであっても、問題を分割し、できることから始める〜そんな姿勢です。{userName}の問題解決能力に多くのひとが助けられています。'
        '{usersName}のいいところは優しさです。あなたの優しい雰囲気や立ち振舞に多くの人がいやされています。’
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param{string}userName ユーザーの名前
     * @return{string}診断結果
     */
    function assessment(userName) {
        //　全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);

        // TODO{userName}をユーザーの名前に置き換える
        return result;
    }
    //テストコード
    console.log(assessment('太郎'));
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    )
})();
