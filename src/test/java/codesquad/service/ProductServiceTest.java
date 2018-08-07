package codesquad.service;

import codesquad.domain.MenuContext;
import codesquad.domain.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductServiceTest {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private ProductService productService;


    private static final Long FIRST_BEST_MENU_ID = 47L;
    @Test
    public void show() {
        Cache cacheAboutProducts = this.cacheManager.getCache("products");
        assertThat(cacheAboutProducts).isNotNull();

        cacheAboutProducts.clear(); // Simple test assuming the cache is empty
        assertThat(cacheAboutProducts.get(FIRST_BEST_MENU_ID)).isNull();

        List<Product> productsFromService = productService.showProducts(FIRST_BEST_MENU_ID);
        List<Product> productsFromCache = (List<Product>) cacheAboutProducts.get(FIRST_BEST_MENU_ID).get();
        assertThat(productsFromCache).isEqualTo(productsFromService);



    }
}