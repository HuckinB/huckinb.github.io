$(function () {
    const presenterDom = $('#presenter');
    const artistDom = $('#artist');
    const titleDom = $('#title');
    const showDom = $('#show');
    const liveDom = $('#liveIcon');

    function updateStats() {
        console.log('Updating stats...');

        $.ajax({
            url: "https://api.simulatorhits.com/now-playing?override=true",
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                presenterDom.text(res.presenter.username);
                artistDom.text(res.song.artist);
                titleDom.text(res.song.title);
                showDom.text(res.show.title);

                if (res.presenter.username !== 'Auto DJ') {
                    if (!liveDom.hasClass('live')) {
                        liveDom.addClass('live');
                    }
                }
            },
            error: function(err) {
                showDom.text('An error occurred while fetching the data.');

                console.error(err)
            }
        })
    }

    setInterval(updateStats, 5000);
    updateStats();
});