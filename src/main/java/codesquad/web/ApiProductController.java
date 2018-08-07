package codesquad.web;

import codesquad.domain.Product;
import codesquad.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ApiProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/{menuId}")
    public List<Product> showProducts(@PathVariable long menuId){
        return productRepository.findAllByEventMenuId(menuId);
    }
}
