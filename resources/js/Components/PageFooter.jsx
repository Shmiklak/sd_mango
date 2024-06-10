export const PageFooter = () => {
    return (
        <footer className="page-footer">
            The website was developed by <a href="https://osu.ppy.sh/users/5504231" target="_blank">Shmiklak</a>

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
            </ul>
        </footer>
    )
}
