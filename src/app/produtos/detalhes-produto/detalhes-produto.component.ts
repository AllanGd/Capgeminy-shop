import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IProdutoCarrinho, produtos } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: IProduto | undefined;
  quantidade = 1;

  constructor(
    private produtoService: ProdutosService,
    private router: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    const routerParams = this.router.snapshot.paramMap;
    const produtId = Number(routerParams.get("id"));
    this.produto = this.produtoService.getOne(produtId);
  }


 adicionarAoCarrinho(){
   const produto: IProdutoCarrinho= {
     ...this.produto!,
     quantidade: this.quantidade
    }
    this.carrinhoService.adicionarAoCarrinho(produto);
    this.notificacaoService.notificar("O produto foi adicionado ao carrinho.");
    
  }
  

}
