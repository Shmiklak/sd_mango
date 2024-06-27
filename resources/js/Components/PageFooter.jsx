export const PageFooter = () => {
    return (
        <footer className="page-footer">
            <h3>Useful links</h3>

            <ul className="d-flex mt-3 footer-links">
                <li>
                    <a href="https://x.com/sd_mango_osu" target="_blank">
                        <img src="/static/assets/images/icons/twitter.svg"/>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Shmiklak/sd_mango" target="_blank">
                        <img src="/static/assets/images/icons/github.svg"/>
                    </a>
                </li>
                <li>
                    <a href="https://discord.gg/2D9aNeTuRh" target="_blank">
                        <img src="/static/assets/images/icons/discord.svg"/>
                    </a>
                </li>
                <li>
                    <a href="https://osu.ppy.sh/community/forums/topics/1930013" target="_blank">
                        <img src="/static/assets/images/icons/osu.svg"/>
                    </a>
                </li>
            </ul>
        </footer>
    )
}
