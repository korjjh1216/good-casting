package shop.goodcasting.api.common.crawl;

import org.jsoup.nodes.Document;
import shop.goodcasting.api.article.hire.domain.Hire;
import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;

import java.io.IOException;
import java.util.List;

public interface CrawlService {
    Document connectUrl(String url) throws IOException;
    List<Actor> nomalCrawl() throws IOException;
    List<Actor> actorCrawl() throws IOException;
    List<Hire> hireCrawl() throws IOException;
    List<ActorDTO> profileCrawl() throws IOException;
}
